import Parse from "../../parse";
import { AlertTriangle, Bell, Bot, CloudSun, DollarSign, GraduationCap, Leaf, Search, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CropTestPanel } from "./CropTestPanel";
import { BroadcastCenter } from "./BroadcastCenter";
import { AdminOrdersPanel } from "./AdminOrdersPanel";
import { SellerListingPanel } from "./SellerListingPanel";
import { dashboardSidebarItems, DashboardTab } from "./dashboardTypes";
import { DashboardSidebar } from "./DashboardSidebar";
import { FarmerLearningCenter } from "./FarmerLearningCenter";
import { ProfilePanel } from "./ProfilePanel";
import { WeatherControlPanel } from "./WeatherControlPanel";
import { fetchMarketPrices, MarketPriceRow, updateMarketPrice } from "../../lib/marketPrices";
import { Language } from "../../lib/translations";

type FarmerDashboardProps = { onLogout: () => void; isAdmin: boolean; onOpenMarketplace: () => void; language: Language };
type ProfileRow = { id: string; fullName: string; email: string; role: string; status: string; learningTopic: string };
type DiagnosisRow = { id: string; cropName: string; diseaseName: string; confidence: number; treatment: string; collectionDecision: string; createdAt: string };
const MONTHLY_TREND = [{ month: "Jan", sales: 42, diagnoses: 24 }, { month: "Feb", sales: 59, diagnoses: 31 }, { month: "Mar", sales: 66, diagnoses: 45 }, { month: "Apr", sales: 72, diagnoses: 53 }, { month: "May", sales: 81, diagnoses: 61 }, { month: "Jun", sales: 94, diagnoses: 78 }];
const MARKET_OVERVIEW = [{ crop: "Beans", change: "+4.8%", direction: "up" }, { crop: "Maize", change: "+2.1%", direction: "up" }, { crop: "Tomatoes", change: "-1.4%", direction: "down" }];

function rowId(prefix: string, id?: string) { return id || `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; }

export function FarmerDashboard({ onLogout, isAdmin, onOpenMarketplace, language }: FarmerDashboardProps) {
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
        const profileQuery = new Parse.Query("FarmerProfile"); profileQuery.descending("createdAt"); profileQuery.limit(1000);
        const [diagnoses, foundProfiles] = await Promise.all([diagnosisQuery.find(), isAdmin ? profileQuery.find() : Promise.resolve([])]);
        if (!alive) return;
        setRecentDiagnoses(diagnoses.map((item) => ({ id: rowId("diagnosis", item.id), cropName: String(item.get("cropName") || "Unknown crop"), diseaseName: String(item.get("diseaseName") || "Pending result"), confidence: Number(item.get("confidence") || 0), treatment: String(item.get("suggestion") || "Follow up with your local agriculture extension officer."), collectionDecision: String(item.get("collectionDecision") || "Monitor the crop and re-test if symptoms continue."), createdAt: new Date(item.createdAt || Date.now()).toLocaleDateString() })));
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

  return (
    <section className="mx-auto w-full max-w-[1920px] bg-[#dfe8e4] px-3 py-3 text-[#1f2d31] dark:bg-[#061b14] dark:text-[#e5f5ee] sm:px-5 sm:py-5 2xl:max-w-[2400px] 2xl:px-9 2xl:py-8">
      <div className="grid gap-4 rounded-[28px] border border-[#d8e2df] bg-[#f7f9f8] p-3 shadow-[0_18px_40px_rgba(29,50,45,0.12)] dark:border-[#174b39] dark:bg-[#0b261d] lg:grid-cols-[250px_minmax(0,1fr)] lg:p-4 2xl:gap-5 2xl:rounded-[30px]">
        <DashboardSidebar activeTab={activeTab} onSelectTab={setActiveTab} isAdmin={isAdmin} onLogout={onLogout} items={dashboardSidebarItems} />

        <main className="min-w-0 space-y-4 rounded-[20px] bg-[#f2f5f4] p-3 dark:bg-[#0d3025] 2xl:space-y-6 2xl:p-5">
          <header className="flex flex-col gap-4 rounded-[18px] bg-white px-4 py-4 shadow-[0_8px_20px_rgba(20,32,28,0.05)] dark:bg-[#123b2f] sm:flex-row sm:items-center sm:justify-between sm:px-5 2xl:px-6 2xl:py-5">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#457c73]">Dashboard</p>
              <h1 className="mt-1 text-2xl font-bold text-[#1d2a2c] sm:text-3xl">{activeTab}</h1>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <label className="hidden items-center gap-2 rounded-xl bg-[#f0f4f3] px-3 py-2 text-[#7f8e8b] md:flex">
                <Search className="h-4 w-4" />
                <input aria-label="Search dashboard" placeholder="Search" className="w-28 bg-transparent text-sm outline-none placeholder:text-[#8ca19b]" />
              </label>
              <button aria-label="Notifications" className="grid h-10 w-10 cursor-pointer place-items-center rounded-xl bg-[#f0f4f3] text-[#2d4d4b] transition hover:bg-[#e5efee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d4d4b]">
                <Bell className="h-5 w-5" />
              </button>
              <button aria-label="Export" className="hidden items-center gap-2 rounded-xl border border-[#dfeae8] bg-white px-3 py-2 text-sm font-semibold text-[#2d4d4b] sm:inline-flex">
                Export
              </button>
            </div>
          </header>

          {activeTab === "Dashboard" && (
            <>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:gap-4">
                {stats.map((stat) => (
                    <article key={stat.label} className="relative min-h-[120px] overflow-hidden rounded-[18px] border border-[#edf1f0] bg-white p-4 shadow-[0_8px_18px_rgba(17,34,27,0.04)] dark:border-[#1d5743] dark:bg-[#123b2f] 2xl:min-h-[140px] 2xl:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#6d7f7b]">{stat.label}</p>
                        <p className="mt-3 text-2xl font-bold text-[#1d2a2c] 2xl:text-[2rem]">{stat.value}</p>
                      </div>
                      <span className={`grid h-10 w-10 place-items-center rounded-xl text-white ${stat.color}`}>
                        <stat.icon className="h-5 w-5" />
                      </span>
                    </div>
                    <p className="mt-3 text-xs text-[#647a78]">{stat.note}</p>
                  </article>
                ))}
              </div>

              <div className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(260px,0.8fr)] 2xl:gap-5">
                <article className="min-w-0 rounded-[18px] border border-[#edf1f0] bg-white p-4 shadow-[0_8px_18px_rgba(17,34,27,0.04)] dark:border-[#1d5743] dark:bg-[#123b2f] 2xl:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-[#1d2a2c]">Farm activity</h2>
                      <p className="mt-1 text-sm text-[#6f817d]">Sales and crop diagnosis progress</p>
                    </div>
                    <span className="rounded-lg bg-[#edf8f5] px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#2a6b60]">This season</span>
                  </div>

                  <div className="mt-5 h-60 2xl:h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={MONTHLY_TREND}>
                        <CartesianGrid stroke="#eef0f5" vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#73807c" }} />
                        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#73807c" }} />
                        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e7eceb", boxShadow: "0 10px 25px rgba(34,44,80,.12)" }} />
                        <Bar dataKey="sales" fill="#2a7d70" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="diagnoses" fill="#a7d8d1" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </article>

                <article className="rounded-[18px] bg-[#103b34] p-4 text-white shadow-[0_12px_22px_rgba(16,59,52,0.18)] 2xl:p-5">
                  <ShieldCheck className="h-9 w-9 text-[#d7f7ee]" />
                  <h2 className="mt-8 text-2xl font-bold">{isAdmin ? "Admin overview" : "Your farm space"}</h2>
                  <p className="mt-3 text-sm leading-6 text-[#d5f0ea]">
                    {isAdmin
                      ? "You can review secure farmer access, weather records and platform activity."
                      : "Use your tools to make confident crop and market decisions every day."}
                  </p>
                  <div className="mt-7 rounded-xl bg-white/10 p-3 text-sm text-[#ebf9f5]">
                    <span className="font-bold text-white">{isAdmin ? profiles.length : recentDiagnoses.length}</span>{" "}
                    {isAdmin ? "farmer profiles available" : "recent crop checks"}
                  </div>
                </article>
              </div>

              <DashboardOverview diagnoses={recentDiagnoses} profiles={profiles} />

              <RecentDiagnoses rows={recentDiagnoses} loading={loading} />
              {isAdmin && <AdminControlCenter farmerCount={profiles.length} onSelectTab={setActiveTab} />}
            </>
          )}

          {activeTab === "Profile" && <ProfilePanel />}
          {activeTab === "AI Detection" && <CropTestPanel />}
          {activeTab === "Weather" && (
            <article className="rounded-[18px] border border-[#edf1f0] bg-white p-4 shadow-[0_8px_18px_rgba(17,34,27,0.04)] 2xl:p-5">
              <WeatherControlPanel isAdmin={isAdmin} />
            </article>
          )}
          {activeTab === "Crop Prices" && (isAdmin ? <AdminMarketPricePanel /> : <InfoCard title="Crop Prices" text="Market prices are managed by the two approved platform administrators." />)}
          {activeTab === "Learning Center" && <FarmerLearningCenter userId={currentUser.id || currentUser.getUsername() || "farmer"} language={language} />}
          {activeTab === "Messages" && <BroadcastCenter isAdmin={isAdmin} />}
          {activeTab === "Orders" && (isAdmin ? <AdminOrdersPanel /> : <InfoCard title="Orders" text="Only platform administrators can view farmer orders." />)}
          {activeTab === "Sell Products" && <SellerListingPanel user={currentUser} />}
          {activeTab === "Settings" && (
            <InfoCard
              title={activeTab}
              text="This workspace is ready for your farming activity. Live marketplace and weather information remains connected."
            />
          )}
          {isAdmin && <AdminTable rows={profiles} loading={loading} />}
        </main>
      </div>
    </section>
  );
}

function DashboardOverview({ diagnoses, profiles }: { diagnoses: DiagnosisRow[]; profiles: ProfileRow[] }) {
  const healthyCount = diagnoses.filter((diagnosis) => diagnosis.diseaseName.toLowerCase().includes("healthy")).length;
  const diseaseCount = diagnoses.length - healthyCount;
  const activities = diagnoses.slice(0, 3).map((diagnosis) => ({
    label: `${diagnosis.cropName} diagnosis completed`,
    detail: `${diagnosis.diseaseName} · ${diagnosis.createdAt}`,
  }));
  if (profiles.length && !activities.length) activities.push({ label: `${profiles[0].fullName} joined the platform`, detail: "New farmer profile" });

  return (
    <div className="grid gap-4 xl:grid-cols-2 2xl:gap-5">
      <article className="rounded-[18px] border border-[#f1dfb9] bg-[#fffaf0] p-4 shadow-[0_8px_18px_rgba(17,34,27,0.04)] dark:border-[#5a4821] dark:bg-[#2a2412] 2xl:p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f8c967] text-[#60440c]"><AlertTriangle className="h-5 w-5" /></span>
          <div><h2 className="text-xl font-bold">Farm alerts</h2><p className="text-sm text-[#7b6b48] dark:text-[#d8c895]">Important updates for your farm</p></div>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl bg-white/75 p-3 dark:bg-white/10"><p className="font-semibold text-[#785a1b] dark:text-[#f5df9c]">Pest warning</p><p className="mt-1 text-xs text-[#8b7b58] dark:text-[#d8c895]">Check crops for early signs</p></div>
          <div className="rounded-xl bg-white/75 p-3 dark:bg-white/10"><p className="font-semibold text-[#785a1b] dark:text-[#f5df9c]">Rain expected</p><p className="mt-1 text-xs text-[#8b7b58] dark:text-[#d8c895]">Plan field work around showers</p></div>
        </div>
      </article>

      <article className="rounded-[18px] border border-[#d7e8e2] bg-white p-4 shadow-[0_8px_18px_rgba(17,34,27,0.04)] dark:border-[#1d5743] dark:bg-[#123b2f] 2xl:p-5">
        <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#dff4eb] text-[#18794e] dark:bg-[#1d5743] dark:text-[#86efac]"><Leaf className="h-5 w-5" /></span><div><h2 className="text-xl font-bold">Crop health</h2><p className="text-sm text-[#6f817d]">Latest diagnosis summary</p></div></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center"><HealthMetric label="Maize" value="92%" tone="good" /><HealthMetric label="Beans" value="74%" tone="watch" /><HealthMetric label="Tomatoes" value="48%" tone="risk" /></div>
        <p className="mt-3 text-xs text-[#6f817d]">{healthyCount} healthy and {diseaseCount} needing attention in recent checks.</p>
      </article>

      <article className="rounded-[18px] border border-[#d7e8e2] bg-white p-4 shadow-[0_8px_18px_rgba(17,34,27,0.04)] dark:border-[#1d5743] dark:bg-[#123b2f] 2xl:p-5">
        <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#e8e1fb] text-[#7057bf]"><Bot className="h-5 w-5" /></span><div><h2 className="text-xl font-bold">AI detection</h2><p className="text-sm text-[#6f817d]">Your crop analysis activity</p></div></div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center"><HealthMetric label="Scans" value={String(diagnoses.length)} tone="neutral" /><HealthMetric label="Healthy" value={String(healthyCount)} tone="good" /><HealthMetric label="Diseases" value={String(diseaseCount)} tone="risk" /></div>
      </article>

      <article className="rounded-[18px] border border-[#d7e8e2] bg-white p-4 shadow-[0_8px_18px_rgba(17,34,27,0.04)] dark:border-[#1d5743] dark:bg-[#123b2f] 2xl:p-5">
        <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#dff4eb] text-[#18794e] dark:bg-[#1d5743] dark:text-[#86efac]"><DollarSign className="h-5 w-5" /></span><div><h2 className="text-xl font-bold">Market prices</h2><p className="text-sm text-[#6f817d]">Weekly movement</p></div></div>
        <div className="mt-4 space-y-2">{MARKET_OVERVIEW.map((item) => <div key={item.crop} className="flex items-center justify-between rounded-xl bg-[#f5f8f7] px-3 py-2.5 dark:bg-[#0b261d]"><span className="font-semibold">{item.crop}</span><span className={item.direction === "up" ? "font-bold text-[#18794e] dark:text-[#86efac]" : "font-bold text-[#d64545]"}>{item.direction === "up" ? "↑" : "↓"} {item.change}</span></div>)}</div>
      </article>

      <article className="rounded-[18px] border border-[#d7e8e2] bg-white p-4 shadow-[0_8px_18px_rgba(17,34,27,0.04)] dark:border-[#1d5743] dark:bg-[#123b2f] xl:col-span-2 2xl:p-5">
        <div className="flex items-center justify-between gap-3"><div><h2 className="text-xl font-bold">Recent farmer activity</h2><p className="text-sm text-[#6f817d]">The latest work recorded on the platform</p></div><Users className="h-6 w-6 text-[#2a7d70]" /></div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">{activities.length ? activities.map((activity) => <div key={`${activity.label}-${activity.detail}`} className="rounded-xl bg-[#f5f8f7] p-3 dark:bg-[#0b261d]"><p className="font-semibold">{activity.label}</p><p className="mt-1 text-xs text-[#6f817d] dark:text-[#b9d7cb]">{activity.detail}</p></div>) : <p className="text-sm text-[#6f817d]">New farmer activity will appear here.</p>}</div>
      </article>
    </div>
  );
}

function HealthMetric({ label, value, tone }: { label: string; value: string; tone: "good" | "watch" | "risk" | "neutral" }) {
  const toneClass = tone === "good" ? "text-[#18794e] dark:text-[#86efac]" : tone === "watch" ? "text-[#b7791f]" : tone === "risk" ? "text-[#d64545]" : "text-[#7057bf]";
  return <div className="rounded-xl bg-[#f5f8f7] p-2.5 dark:bg-[#0b261d]"><p className="text-[11px] font-semibold text-[#6f817d]">{label}</p><p className={`mt-1 text-lg font-bold ${toneClass}`}>{value}</p></div>;
}

function RecentDiagnoses({ rows, loading }: { rows: DiagnosisRow[]; loading: boolean }) { return <article className="rounded-2xl bg-white p-5 shadow-[0_6px_25px_rgba(34,44,80,0.06)] dark:bg-[#123b2f] 2xl:p-7"><h2 className="text-xl font-bold">Your crop feedback</h2><p className="mt-1 text-sm text-[#667581] dark:text-[#b9d7cb]">Treatment and collection guidance for every crop you test.</p><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{loading ? <p className="text-sm text-[#87939e]">Loading feedback...</p> : rows.length ? rows.map((row) => <div key={row.id} className="rounded-xl bg-[#f5f7fb] p-4 dark:bg-[#0b261d]"><div className="flex items-start justify-between gap-2"><p className="font-bold">{row.cropName}</p><span className="text-xs font-bold text-[#7057bf]">{row.confidence}%</span></div><p className="mt-1 text-sm font-semibold text-[#667581] dark:text-[#b9d7cb]">{row.diseaseName}</p><p className="mt-3 text-xs leading-5 text-[#465f5a] dark:text-[#d5eee5]"><span className="font-bold">Treatment: </span>{row.treatment}</p><p className="mt-2 text-xs leading-5 text-[#465f5a] dark:text-[#d5eee5]"><span className="font-bold">Harvest guidance: </span>{row.collectionDecision}</p><p className="mt-3 text-[11px] text-[#87939e]">Tested {row.createdAt}</p></div>) : <p className="text-sm text-[#87939e]">Your crop test feedback will appear here.</p>}</div></article>; }
function AdminControlCenter({ farmerCount, onSelectTab }: { farmerCount: number; onSelectTab: (tab: DashboardTab) => void }) {
  return <article className="rounded-[18px] border border-[#b9dfcf] bg-[#eaf8f2] p-5 shadow-[0_8px_18px_rgba(17,34,27,0.05)] dark:border-[#1d5743] dark:bg-[#123b2f] 2xl:p-7">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#18794e] dark:text-[#86efac]">Administrator workspace</p><h2 className="mt-1 text-xl font-bold">Control centre for all districts</h2><p className="mt-1 text-sm text-[#467267] dark:text-[#b9d7cb]">Only the two approved administrators can use these controls.</p></div>
      <ShieldCheck className="h-7 w-7 text-[#18794e] dark:text-[#86efac]" />
    </div>
    <div className="mt-5 grid gap-3 sm:grid-cols-3">
      <AdminAction title="All farmers" detail={`${farmerCount} registered profiles`} onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })} />
      <AdminAction title="District weather" detail="Edit every Rwanda district" onClick={() => onSelectTab("Weather")} />
      <AdminAction title="Market prices" detail="Edit price and availability" onClick={() => onSelectTab("Crop Prices")} />
    </div>
  </article>;
}
function AdminAction({ title, detail, onClick }: { title: string; detail: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="cursor-pointer rounded-xl border border-[#b9dfcf] bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-[#2a7d70] hover:shadow-md dark:border-[#28664f] dark:bg-[#0b261d]">
    <p className="font-bold text-[#1f4d43] dark:text-[#e5f5ee]">{title}</p><p className="mt-1 text-xs text-[#647a78] dark:text-[#b9d7cb]">{detail}</p>
  </button>;
}
function AdminMarketPricePanel() {
  const [rows, setRows] = useState<MarketPriceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    fetchMarketPrices().then(setRows).finally(() => setLoading(false));
  }, []);

  const updateField = (id: string, field: "price" | "availableKg", value: string) => {
    setRows((current) => current.map((row) => row.id === id ? { ...row, [field]: Number(value) } : row));
  };

  const saveRow = async (row: MarketPriceRow) => {
    setSavingId(row.id);
    try {
      await updateMarketPrice(row.id, row.price, row.availableKg);
    } finally {
      setSavingId(null);
    }
  };

  return <article className="rounded-[18px] bg-white p-5 shadow-[0_6px_25px_rgba(34,44,80,0.06)] dark:bg-[#123b2f] 2xl:p-7">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><h2 className="text-xl font-bold">Market price control</h2><p className="mt-1 text-sm text-[#667581]">Admin-only controls for every Rwanda district.</p></div>
      <span className="rounded-full bg-[#dcfce7] px-3 py-1 text-xs font-bold text-[#18794e]">2 admins only</span>
    </div>
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[700px] text-left text-sm"><thead className="text-[#84919c]"><tr><th className="pb-3">Crop</th><th className="pb-3">District</th><th className="pb-3">Price (RWF/kg)</th><th className="pb-3">Available (kg)</th><th className="pb-3">Action</th></tr></thead>
        <tbody>{loading ? <tr><td className="py-3 text-[#87939e]">Loading market prices...</td></tr> : rows.map((row) => <tr key={row.id} className="border-t border-[#edf0f4]"><td className="py-3 font-bold">{row.crop}</td><td className="py-3">{row.district}</td><td className="py-3"><input type="number" min="0" value={row.price} onChange={(event) => updateField(row.id, "price", event.target.value)} className="w-28 rounded-lg border border-[#dce7e3] px-2 py-1 outline-none focus:border-[#2a7d70]" /></td><td className="py-3"><input type="number" min="0" value={row.availableKg} onChange={(event) => updateField(row.id, "availableKg", event.target.value)} className="w-24 rounded-lg border border-[#dce7e3] px-2 py-1 outline-none focus:border-[#2a7d70]" /></td><td className="py-3"><button type="button" onClick={() => saveRow(row)} disabled={savingId === row.id} className="rounded-lg bg-[#103b34] px-3 py-1.5 text-xs font-bold text-white disabled:opacity-50">{savingId === row.id ? "Saving..." : "Save"}</button></td></tr>)}</tbody>
      </table>
    </div>
  </article>;
}
function InfoCard({ title, text }: { title: string; text: string }) { return <article className="rounded-2xl bg-white p-6 shadow-[0_6px_25px_rgba(34,44,80,0.06)] dark:bg-[#123b2f]"><h2 className="text-2xl font-bold">{title}</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-[#667581] dark:text-[#b9d7cb]">{text}</p></article>; }
function AdminTable({ rows, loading }: { rows: ProfileRow[]; loading: boolean }) { return <article className="overflow-hidden rounded-2xl bg-white p-5 shadow-[0_6px_25px_rgba(34,44,80,0.06)] dark:bg-[#123b2f] 2xl:p-7"><h2 className="text-xl font-bold">Farmer access register</h2><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm"><thead className="text-[#84919c] dark:text-[#b9d7cb]"><tr><th className="pb-3">Farmer</th><th className="pb-3">Email</th><th className="pb-3">Focus</th><th className="pb-3">Status</th></tr></thead><tbody>{loading ? <tr><td className="py-3 text-[#87939e]">Loading profiles...</td></tr> : rows.map((profile) => <tr key={profile.id} className="border-t border-[#edf0f4] dark:border-[#1d5743]"><td className="py-3 font-bold">{profile.fullName}</td><td className="py-3">{profile.email}</td><td className="py-3">{profile.learningTopic}</td><td className="py-3"><span className="rounded-full bg-[#dcfce7] px-2.5 py-1 text-xs font-bold text-[#18794e]">{profile.status}</span></td></tr>)}</tbody></table></div></article>; }
