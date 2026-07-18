import Parse from "../../parse";
import { LayoutDashboard, LogOut, Menu, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { DashboardTab } from "./dashboardTypes";

type DashboardSidebarProps = {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  isAdmin: boolean;
  onLogout: () => void;
  items: DashboardTab[];
};

export function DashboardSidebar({ activeTab, onSelectTab, isAdmin, onLogout, items }: DashboardSidebarProps) {
  const currentUser = Parse.User.current();
  const [isOpen, setIsOpen] = useState(false);
  const avatar = currentUser?.get("avatar");
  const avatarUrl = avatar?.url() || `https://api.dicebear.com/9.x/avataaars/svg?seed=${currentUser?.id || "farmer"}`;
  const selectTab = (tab: DashboardTab) => {
    onSelectTab(tab);
    setIsOpen(false);
  };

  return (
    <aside className="relative z-20 lg:sticky lg:top-5 lg:h-[calc(100dvh-2.5rem)]">
      <button type="button" onClick={() => setIsOpen((value) => !value)} aria-expanded={isOpen} className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-[#4c1d95] px-5 py-4 text-white shadow-lg lg:hidden">
        <span className="inline-flex items-center gap-3 font-bold"><LayoutDashboard className="h-5 w-5" /> Farmer Dashboard</span>
        <Menu className="h-5 w-5" />
      </button>
      <div className={`${isOpen ? "block" : "hidden"} mt-2 overflow-hidden rounded-2xl bg-[#4c1d95] p-3 shadow-[0_18px_45px_rgba(49,18,109,0.33)] lg:mt-0 lg:flex lg:h-full lg:flex-col lg:rounded-[1.8rem] lg:p-4`}>
        <div className="mb-4 hidden items-center gap-3 px-2 pt-2 lg:flex">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-[#5b21b6]"><LeafMark /></span>
          <div><p className="font-bold text-white">Smart Ubuhinzi</p><p className="text-xs text-[#ddd6fe]">Farmer workspace</p></div>
        </div>
        <nav className="grid gap-1 sm:grid-cols-2 lg:block" aria-label="Dashboard navigation">
          {items.map((item) => (
            <button key={item} type="button" onClick={() => selectTab(item)} className={`mb-1 flex w-full cursor-pointer items-center rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:px-4 ${activeTab === item ? "bg-white text-[#5120a5] shadow-sm" : "text-[#ede9fe] hover:bg-white/10"}`}>
              {item}
            </button>
          ))}
        </nav>
        <div className="mt-3 border-t border-white/15 pt-3 lg:mt-auto">
          {isAdmin && <p className="mb-3 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs text-[#f5f3ff]"><ShieldCheck className="h-4 w-4" /> Admin controls enabled</p>}
          <button type="button" onClick={onLogout} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/25 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><LogOut className="h-4 w-4" /> Log out</button>
        </div>
      </div>
    </aside>
  );
}

function LeafMark() {
  return <span className="text-xl font-black">S</span>;
}
