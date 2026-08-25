import Parse from "./parse";
import { useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "sonner";
import { AuthShowcase } from "./components/auth/AuthShowcase";
import { FarmerDashboard } from "./components/dashboard/FarmerDashboard";
import { HomePage } from "./components/home/HomePage";
import { MainNav } from "./components/layout/MainNav";
import { TopBar } from "./components/layout/TopBar";
import { MarketplacePage } from "./components/marketplace/MarketplacePage";
import { isAdminUser } from "./lib/authAccess";
import { Language } from "./lib/translations";
import { applyThemeTokens } from "./lib/theme";

const sectionIds = ["hero", "about", "services", "weather", "ai-detection", "news", "contact"];
type AppView = "home" | "marketplace" | "dashboard";

export default function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<Parse.User | null>(() => Parse.User.current());
  const [isDark, setIsDark] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const [appView, setAppView] = useState<AppView>(() => (Parse.User.current() ? "dashboard" : "home"));
  const [pendingSection, setPendingSection] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem("app-language");
    return stored === "rw" ? "rw" : "en";
  });

  const backgroundClass = useMemo(
    () => (isDark ? "bg-[var(--theme-night)] text-[var(--theme-light)]" : "bg-[#E2E8F0] text-[var(--theme-slate)]"),
    [isDark],
  );
  const isAdmin = useMemo(() => isAdminUser(user), [user]);

  useEffect(() => {
    applyThemeTokens();
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem("app-language", language);
  }, [language]);

  useEffect(() => {
    const onScroll = () => {
      if (appView !== "home") return;
      const current = sectionIds.find((id) => {
        const element = document.getElementById(id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 140 && rect.bottom >= 140;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [appView]);

  useEffect(() => {
    if (appView !== "home" || !pendingSection) return;
    const element = document.getElementById(pendingSection);
    if (!element) return;
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    setPendingSection(null);
  }, [appView, pendingSection]);

  const goToHomeSection = (sectionId: string) => {
    setAppView("home");
    setPendingSection(sectionId);
  };

  const handleAuthSuccess = () => {
    const currentUser = Parse.User.current();
    setUser(currentUser);
    setAppView("dashboard");
    toast.success("Welcome to your dashboard!");
  };

  const handleLogout = async () => {
    await Parse.User.logOut();
    setUser(null);
    setAppView("home");
    toast.success("Logged out successfully.");
  };

  const handleGoToDashboard = () => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    setAppView("dashboard");
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${backgroundClass}`}>
      <Toaster richColors position="top-right" />

      {!user && <TopBar onOpenAuth={() => setShowAuth(true)} language={language} onLanguageChange={setLanguage} />}

      <MainNav
        activeSection={activeSection}
        currentView={appView}
        isLoggedIn={Boolean(user)}
        onGoToSection={goToHomeSection}
        onGoToMarketplace={() => setAppView("marketplace")}
        onGoToDashboard={handleGoToDashboard}
        onGoToHome={() => setAppView("home")}
        onOpenAuth={() => setShowAuth(true)}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        language={language}
      />

      {appView === "dashboard" && user ? (
        <FarmerDashboard onLogout={handleLogout} isAdmin={isAdmin} onOpenMarketplace={() => setAppView("marketplace")} />
      ) : appView === "marketplace" ? (
        <MarketplacePage onOpenAuth={() => setShowAuth(true)} language={language} />
      ) : (
        <HomePage
          onOpenAuth={() => setShowAuth(true)}
          onOpenMarketplace={() => setAppView("marketplace")}
          onGoToSection={goToHomeSection}
          onGoToDashboard={handleGoToDashboard}
          language={language}
        />
      )}

      {showAuth && <AuthShowcase onClose={() => setShowAuth(false)} onSuccess={handleAuthSuccess} />}
    </div>
  );
}
