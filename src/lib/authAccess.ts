import Parse from "../parse";

// Exactly two admin accounts control the whole platform (user register, weather, market prices).
export const ADMIN_EMAILS = ["admin1@smartubuhinzi.rw", "admin2@smartubuhinzi.rw"];

export function isAdminUser(user: Parse.User | null) {
  if (!user) return false;
  const email = String(user.get("email") || user.getUsername() || "").toLowerCase();
  return ADMIN_EMAILS.includes(email);
}
