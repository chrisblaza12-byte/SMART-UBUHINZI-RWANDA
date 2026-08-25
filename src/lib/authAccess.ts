import Parse from "../parse";

// Exactly two admin accounts control the whole platform (user register, weather, market prices).
export const ADMIN_PROFILES = {
  "ndayisabapatrick75@gmail.com": "ndayisaba patrick",
  "mucyoolivier4@gmail.com": "mucyo olivier",
} as const;

export const ADMIN_EMAILS = Object.keys(ADMIN_PROFILES);

export function getAdminName(email: string) {
  return ADMIN_PROFILES[email.trim().toLowerCase() as keyof typeof ADMIN_PROFILES];
}

export function isAdminUser(user: Parse.User | null) {
  if (!user) return false;
  const email = String(user.get("email") || user.getUsername() || "").trim().toLowerCase();
  return ADMIN_EMAILS.includes(email);
}
