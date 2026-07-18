export type Language = "en" | "rw";

type TranslationShape = {
  topBarWelcome: string;
  loginRegister: string;
  getStarted: string;
  nav: {
    home: string;
    about: string;
    services: string;
    marketplace: string;
    weather: string;
    aiDetection: string;
    news: string;
    contact: string;
    dashboard: string;
  };
  home: {
    openMarketplace: string;
    quickServices: string;
    aboutTitle: string;
  };
  marketplace: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allDistricts: string;
    downloadPdf: string;
    buy: string;
    contact: string;
    sendMessage: string;
    cancel: string;
  };
};

export const translations: Record<Language, TranslationShape> = {
  en: {
    topBarWelcome: "Welcome to Smart Ubuhinzi Rwanda",
    loginRegister: "Login / Register",
    getStarted: "Get Started",
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      marketplace: "Marketplace",
      weather: "Weather",
      aiDetection: "AI Detection",
      news: "News",
      contact: "Contact",
      dashboard: "Dashboard",
    },
    home: {
      openMarketplace: "Open Marketplace",
      quickServices: "Quick Services",
      aboutTitle: "About Smart Ubuhinzi Rwanda",
    },
    marketplace: {
      title: "Marketplace • All 30 Districts of Rwanda",
      subtitle: "Search by district/crop, place buy requests, contact farmers, and download a full PDF report.",
      searchPlaceholder: "Search district, crop, farmer",
      allDistricts: "All Districts",
      downloadPdf: "Download PDF",
      buy: "Buy",
      contact: "Contact",
      sendMessage: "Send Message",
      cancel: "Cancel",
    },
  },
  rw: {
    topBarWelcome: "Murakaza neza kuri Smart Ubuhinzi Rwanda",
    loginRegister: "Injira / Iyandikishe",
    getStarted: "Tangira",
    nav: {
      home: "Ahabanza",
      about: "Ibitwerekeye",
      services: "Serivisi",
      marketplace: "Isoko",
      weather: "Ikirere",
      aiDetection: "AI Isuzuma",
      news: "Amakuru",
      contact: "Twandikire",
      dashboard: "Imbonerahamwe",
    },
    home: {
      openMarketplace: "Fungura Isoko",
      quickServices: "Serivisi zihuse",
      aboutTitle: "Ibyerekeye Smart Ubuhinzi Rwanda",
    },
    marketplace: {
      title: "Isoko • Uturere 30 tw'u Rwanda",
      subtitle: "Shakisha ku karere/igihingwa, gura, vugana n'umuhinzi kandi ukuremo raporo ya PDF.",
      searchPlaceholder: "Shakisha akarere, igihingwa, umuhinzi",
      allDistricts: "Uturere twose",
      downloadPdf: "Kuramo PDF",
      buy: "Gura",
      contact: "Vugana",
      sendMessage: "Ohereza ubutumwa",
      cancel: "Hagarika",
    },
  },
};
