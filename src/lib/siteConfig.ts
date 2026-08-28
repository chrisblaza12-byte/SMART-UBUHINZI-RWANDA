type SiteRuntimeConfig = {
  VITE_GOOGLE_SITE_VERIFICATION?: string;
  VITE_GOOGLE_ANALYTICS_ID?: string;
};

declare global {
  interface Window {
    __SMART_UBUHINZI_CONFIG__?: SiteRuntimeConfig;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getSiteConfig(): SiteRuntimeConfig {
  const runtime = typeof window === "undefined" ? {} : window.__SMART_UBUHINZI_CONFIG__ || {};
  return {
    VITE_GOOGLE_SITE_VERIFICATION: String(runtime.VITE_GOOGLE_SITE_VERIFICATION || import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || "").trim(),
    VITE_GOOGLE_ANALYTICS_ID: String(runtime.VITE_GOOGLE_ANALYTICS_ID || import.meta.env.VITE_GOOGLE_ANALYTICS_ID || "").trim(),
  };
}

export function configureSiteIntegrations() {
  const { VITE_GOOGLE_SITE_VERIFICATION: verification, VITE_GOOGLE_ANALYTICS_ID: analyticsId } = getSiteConfig();

  if (verification && !document.querySelector('meta[name="google-site-verification"]')) {
    const meta = document.createElement("meta");
    meta.name = "google-site-verification";
    meta.content = verification;
    document.head.appendChild(meta);
  }

  if (!analyticsId || document.querySelector(`script[data-smart-ga="${analyticsId}"]`)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
  window.gtag("js", new Date());
  window.gtag("config", analyticsId, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analyticsId)}`;
  script.dataset.smartGa = analyticsId;
  document.head.appendChild(script);
}