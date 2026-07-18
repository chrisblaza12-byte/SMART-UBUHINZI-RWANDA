export const themeTokens = {
  brandGreen: "#22C55E",
  brandGreenDeep: "#14532D",
  brandGreenSoft: "#DCFCE7",
  accentGold: "#F59E0B",
  night: "#020617",
  slate: "#0F172A",
  light: "#F8FAFC",
} as const;

export function applyThemeTokens() {
  const root = document.documentElement;
  root.style.setProperty("--brand-green", themeTokens.brandGreen);
  root.style.setProperty("--brand-green-deep", themeTokens.brandGreenDeep);
  root.style.setProperty("--brand-green-soft", themeTokens.brandGreenSoft);
  root.style.setProperty("--accent-gold", themeTokens.accentGold);
  root.style.setProperty("--theme-night", themeTokens.night);
  root.style.setProperty("--theme-slate", themeTokens.slate);
  root.style.setProperty("--theme-light", themeTokens.light);
}
