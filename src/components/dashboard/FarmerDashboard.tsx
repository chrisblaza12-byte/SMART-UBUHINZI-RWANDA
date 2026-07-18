import Parse from "../../parse";
import { Bell, CloudSun, GraduationCap, Leaf, Search, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CropTestPanel } from "./CropTestPanel";
import { dashboardSidebarItems, DashboardTab } from "./dashboardTypes";
import { DashboardSidebar } from "./DashboardSidebar";
import { ProfilePanel } from "./ProfilePanel";
import { WeatherControlPanel } from "./WeatherControlPanel";

type FarmerDashboardProps = { onLogout: () => void; isAdmin: boolean; onOpenMarketplace: () => void };
type ProfileRow = { id: string; fullName: string; email: string; role: string; status: string; learningTopic: string };
type DiagnosisRow = { id: string; cropName: string; diseaseName: string; confidence: number; createdAt: string };
const MONTHLY_TREND = [{ month: "Jan", sales: 42, diagnoses: 24 }, { month: "Feb", sales: 59, diagnoses: 31 }, { month: "Mar", sales: 66, diagnoses: 45 }, { month: "Apr", sales: 72, diagnoses: 53 }, { month: "May", sales: 81, diagnoses: 61 }, { month: "Jun", sales: 94, diagnoses: 78 }];

function rowId(prefix: string, id?: string) { return id || `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; }

export function FarmerDashboard({ onLogout, isAdmin, onOpenMarketplace }: FarmerDashboardProps) {
  const currentUser = Parse.User.current();
  const [activeTab, setActiveTab] = useState<DashboardTab>("Dashboard");
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [recentDiagnoses, setRecentDiagnoses] = useState<DiagnosisRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { if (activeTab === "Marketplace") { onOpenMarketplace(); setActiveTab("Dashboard"); } }, [activeTab, onOpenMarketplace]);
  useEffect(() => {
    if (!currentUser) return;
    let alive = true;
    const diagnosisQuery = new Parse.Query("CropDiagnosis");
    diagnosisQuery.descending("createdAt"); diagnosisQuery.limit(6);
    if (!isAdmin) diagnosisQuery.equalTo("createdBy", currentUser);
    const load = async () => {
      try {
        const profileQuery = new Parse.Query("FarmerProfile"); profileQuery.descending("createdAt"); profileQuery.limit(30);
        const [diagnoses, foundProfiles] = await Promise.all([diagnosisQuery.find(), isAdmin ? profileQuery.find() : Promise.resolve([])]);
        if (!alive) return;
        setRecentDiagnoses(diagnoses.map((item) => ({ id: rowId("diagnosis", item.id), cropName: String(item.get("cropName") || "Unknown crop"), diseaseName: String(item.get("diseaseName") || "Pending result"), confidence: Number(item.get("confidence") || 0), createdAt: new Date(item.createdAt || Date.now()).toLocaleDateString() })));
        setProfiles(foundProfiles.map((item) => ({ id: rowId("profile", item.id), fullName: String(item.get("fullName") || "Farmer"), email: String(item.get("email") || "-"), role: String(item.get("role") || "farmer"), status: String(item.get("status") || "active"), learningTopic: String(item.get("learningTopic") || "General farming") })));
      } finally { if (alive) setLoading(false); }
    };
    load(); return () => { alive = false; };
  }, [currentUser, isAdmin]);

  const stats = useMemo(() => [
    { label: "Weather today", value: "24°C", note: "Rain chance 40%", icon: CloudSun, color: "bg-[#49aee8]" },
    { label: "Market trend", value: "Beans +4.8%", note: "Best price this week", icon: TrendingUp, color: "bg-[#26c994]" },
    { label: isAdmin ? "Farmers" : "My diagnoses", value: String(isAdmin ? profiles.length : recentDiagnoses.length), note: isAdmin ? "Registered users" : "Crop checks completed", icon: isAdmin ? Users : Leaf, color: "bg-[#9072df]" },
    { label: "Learning", value: "On track", note: String(currentUser?.get("learningTopic") || "Farm guidance"), icon: GraduationCap, color: "bg-[#f1a93f]" },
  ], [currentUser, isAdmin, profiles.length, recentDiagnoses.length]);
  if (!currentUser) return null;

  return <section className="mx-auto grid w-full max-w-[1920px] gap-4 bg-[#f6f7fc] px-3 py-3 text-[#253342] sm:px-5 sm:py-5 lg:grid-cols-[250px_minmax(0,1fr)] 2xl:max-w-[2400px] 2xl:gap-7 2xl:px-9 2xl:py-8">
    <DashboardSidebar activeTab={activeTab} onSelectTab={setActiveTab} isAdmin={isAdmin} onLogout={onLogout} items={dashboardSidebarItems} />
    <main className="min-w-0 space-y-4 2xl:space-y-7">
      <header className="flex flex-col gap-4 rounded-2xl bg-white px-5 py-4 shadow-[0_6px_25px_rgba(34,44,80,0.06)] sm:flex-row sm:items-center sm:justify-between sm:px-7 2xl:rounded-[1.6rem] 2xl:px-9 2xl:py-6">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8262c9]">Farm management center</p><h1 className="mt-1 text-3xl font-bold text-[#1f2c38] sm:text-4xl">{activeTab}</h1></div>
        <div className="flex items-center gap-3"><label className="hidden items-center gap-2 rounded-xl bg-[#f3f5f8] px-3 py-2 text-[#8b97a2] md:flex"><Search className="h-4 w-4" /><input aria-label="Search dashboard" placeholder="Search tools..." className="w-36 bg-transparent text-sm outline-none" /></label><button aria-label="Notifications" className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl bg-[#f3f5f8] text-[#6a55b6] transition hover:bg-[#ede9fe] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a55b6]"><Bell className="h-5 w-5" /></button></div>
      </header>
      {activeTab === "Dashboard" && <>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:gap-5">{stats.map((stat) => <article key={stat.label} className={`${stat.color} relative min-h-[137px] overflow-hidden rounded-2xl p-5 text-white shadow-[0_10px_25px_rgba(52,65,85,0.13)] 2xl:min-h-[175px] 2xl:p-7`}><stat.icon className="absolute -right-3 -top-3 h-24 w-24 text-white/15" /><p className="text-sm font-semibold text-white/85">{stat.label}</p><p className="mt-4 text-2xl font-black 2xl:text-3xl">{stat.value}</p><p className="mt-1 truncate text-xs text-white/80">{stat.note}</p></article>)}</div>
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(250px,0.8fr)] 2xl:gap-7">
          <article className="min-w-0 rounded-2xl bg-white p-5 shadow-[0_6px_25px_rgba(34,44,80,0.06)] 2xl:p-7"><div className="flex items-start justify-between"><div><h2 className="text-xl font-bold">Farm activity</h2><p className="mt-1 text-sm text-[#87939e]">Sales and crop diagnosis progress</p></div><span className="rounded-lg bg-[#ede9fe] px-3 py-1.5 text-xs font-bold text-[#6948bc]">This season</span></div><div className="mt-5 h-56 sm:h-64 2xl:h-80"><ResponsiveContainer width="100%" height="100%"><BarChart data={MONTHLY_TREND}><CartesianGrid stroke="#eef0f5" vertical={false} /><XAxis dataKey="month" tickLine={false} axisLine={false} /><YAxis tickLine={false} axisLine={false} /><Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 10px 25px rgba(34,44,80,.15)" }} /><Bar dataKey="sales" fill="#7359c7" radius={[6, 6, 0, 0]} /><Bar dataKey="diagnoses" fill="#30c898" radius={[6, 6, 0, 0]} /></BarChart></ResponsiveContainer></div></article>
          <article className="rounded-2xl bg-[#33206d] p-5 text-white shadow-[0_10px_25px_rgba(52,65,85,0.15)] 2xl:p-7"><ShieldCheck className="h-9 w-9 text-[#c4b5fd]" /><h2 className="mt-8 text-2xl font-bold">{isAdmin ? "Admin overview" : "Your farm space"}</h2><p className="mt-3 text-sm leading-6 text-[#ddd6fe]">{isAdmin ? "You can review secure farmer access, weather records and platform activity." : "Use your tools to make confident crop and market decisions every day."}</p><div className="mt-7 rounded-xl bg-white/10 p-3 text-sm"><span className="font-bold">{isAdmin ? profiles.length : recentDiagnoses.length}</span> {isAdmin ? "farmer profiles available" : "recent crop checks"}</div></article>
        </div>
        <RecentDiagnoses rows={recentDiagnoses} loading={loading} />
      </>}
      {activeTab === "Profile" && <ProfilePanel />}
      {activeTab === "AI Detection" && <CropTestPanel />}
      {activeTab === "Weather" && <article className="rounded-2xl bg-white p-5 shadow-[0_6px_25px_rgba(34,44,80,0.06)] 2xl:p-7"><WeatherControlPanel isAdmin={isAdmin} /></article>}
      {activeTab === "Learning Center" && <InfoCard title="Learning recommendations" text={`Your selected focus: ${String(currentUser.get("learningTopic") || "Pest & Disease Management")}. New practical lessons are ready for your farm.`} />}
      {["Crop Prices", "Sell Products", "Messages", "Settings"].includes(activeTab) && <InfoCard title={activeTab} text="This workspace is ready for your farming activity. Live marketplace and weather information remains connected." />}
      {isAdmin && <AdminTable rows={profiles} loading={loading} />}
    </main>
  </section>;
}

function RecentDiagnoses({ rows, loading }: { rows: DiagnosisRow[]; loading: boolean }) { return <article className="rounded-2xl bg-white p-5 shadow-[0_6px_25px_rgba(34,44,80,0.06)] 2xl:p-7"><h2 className="text-xl font-bold">Recent crop diagnosis</h2><div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">{loading ? <p className="text-sm text-[#87939e]">Loading activity...</p> : rows.length ? rows.map((row) => <div key={row.id} className="rounded-xl bg-[#f5f7fb] p-4"><p className="font-bold">{row.cropName}</p><p className="mt-1 text-sm text-[#667581]">{row.diseaseName}</p><p className="mt-3 text-xs font-bold text-[#7057bf]">{row.confidence}% confidence · {row.createdAt}</p></div>) : <p className="text-sm text-[#87939e]">Your crop checks will appear here.</p>}</div></article>; }
function InfoCard({ title, text }: { title: string; text: string }) { return <article className="rounded-2xl bg-white p-6 shadow-[0_6px_25px_rgba(34,44,80,0.06)]"><h2 className="text-2xl font-bold">{title}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-[#667581]">{text}</p></article>; }
function AdminTable({ rows, loading }: { rows: ProfileRow[]; loading: boolean }) { return <article className="overflow-hidden rounded-2xl bg-white p-5 shadow-[0_6px_25px_rgba(34,44,80,0.06)] 2xl:p-7"><h2 className="text-xl font-bold">Farmer access register</h2><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="text-[#84919c]"><tr><th className="pb-3">Farmer</th><th className="pb-3">Email</th><th className="pb-3">Focus</th><th className="pb-3">Status</th></tr></thead><tbody>{loading ? <tr><td className="py-3 text-[#87939e]">Loading profiles...</td></tr> : rows.map((profile) => <tr key={profile.id} className="border-t border-[#edf0f4]"><td className="py-3 font-bold">{profile.fullName}</td><td className="py-3">{profile.email}</td><td className="py-3">{profile.learningTopic}</td><td className="py-3"><span className="rounded-full bg-[#dcfce7] px-2.5 py-1 text-xs font-bold text-[#18794e]">{profile.status}</span></td></tr>)}</tbody></table></div></article>; }
