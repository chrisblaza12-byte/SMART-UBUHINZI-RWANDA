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
  const avatarUrl =
    typeof avatar === "string"
      ? avatar
      : avatar?.url?.() ?? `https://api.dicebear.com/9.x/avataaars/svg?seed=${currentUser?.id || "farmer"}`;
  const selectTab = (tab: DashboardTab) => {
    onSelectTab(tab);
    setIsOpen(false);
  };

  return (
    <aside className="relative z-20 lg:sticky lg:top-5 lg:h-[calc(100dvh-2.5rem)]">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between rounded-2xl bg-[#103b34] px-5 py-4 text-white shadow-lg lg:hidden"
      >
        <span className="inline-flex items-center gap-3 font-bold">
          <LayoutDashboard className="h-5 w-5" />
          Farmer Dashboard
        </span>
        <Menu className="h-5 w-5" />
      </button>

      <div
        className={`${isOpen ? "block" : "hidden"} mt-2 overflow-hidden rounded-[1.6rem] bg-[#103b34] p-3 shadow-[0_18px_45px_rgba(15,45,39,0.28)] lg:mt-0 lg:flex lg:h-full lg:flex-col lg:p-4`}
      >
        <div className="mb-5 hidden items-center justify-between gap-3 px-2 pt-2 lg:flex">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-lg font-black text-[#dff7f1]">
              <LeafMark />
            </span>
            <div>
              <p className="text-sm font-bold text-white">Viza</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Toggle menu"
            className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-[#dff7f1]"
          >
            <LayoutDashboard className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-2.5 lg:mt-3">
          <img src={avatarUrl} alt="User avatar" className="h-10 w-10 rounded-full border border-white/20 object-cover" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{currentUser?.get("fullName") || "Farmer"}</p>
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#bfded6]">{isAdmin ? "Admin" : "Farmer"}</p>
          </div>
        </div>

        <nav className="grid gap-1 sm:grid-cols-2 lg:block" aria-label="Dashboard navigation">
          {items.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => selectTab(item)}
              className={`mb-1 flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                activeTab === item
                  ? "bg-white text-[#163d35] shadow-sm"
                  : "text-[#dcefe9] hover:bg-white/8"
              }`}
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-white/10 text-[9px] font-bold">{item.charAt(0)}</span>
              {item}
            </button>
          ))}
        </nav>

        <div className="mt-4 border-t border-white/10 pt-3 lg:mt-auto">
          {isAdmin && (
            <div className="mb-3 rounded-xl bg-white/8 px-3 py-2 text-xs text-[#f5f3ff]">
              <p className="flex items-center gap-2 font-bold"><ShieldCheck className="h-4 w-4" /> Admin controls enabled</p>
              <p className="mt-1 truncate text-[10px] text-[#bfded6]">{String(currentUser?.get("email") || currentUser?.getUsername())}</p>
              <p className="mt-2 leading-4 text-[#dcefe9]">Full farmer register, district weather, and market prices</p>
            </div>
          )}
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}

function LeafMark() {
  return <span className="text-lg font-black">V</span>;
}
