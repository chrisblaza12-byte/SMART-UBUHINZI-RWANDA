import Parse from "../../parse";
import { Eye, EyeOff, Leaf, Loader2, LockKeyhole, Mail, UserRound, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LEARNING_TOPICS } from "../../content/authContent";

type AuthShowcaseProps = { onClose: () => void; onSuccess: () => void };
type AuthMode = "signin" | "register";

function getErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  const normalized = message.toLowerCase();
  if (normalized.includes("unexpected end of json")) return `The registration endpoint did not return valid JSON. ${message}. If you are running this downloaded project locally, set VITE_PARSE_SERVER_URL and VITE_PARSE_APP_ID in a .env file for your Back4App application.`;
  if (normalized.includes("unauthorized") || normalized.includes("invalid application id") || normalized.includes("invalid key")) return "Your Back4App connection details were rejected. Check that VITE_PARSE_APP_ID, VITE_PARSE_JAVASCRIPT_KEY, and VITE_PARSE_SERVER_URL in .env.local all belong to the same Back4App application. Then restart npm run dev.";
  if (normalized.includes("already been taken")) return "This email already has an account. Please sign in.";
  if (normalized.includes("invalid username/password")) return "Your email or password is incorrect.";
  if (normalized.includes("email")) return "Please enter a valid email address.";
  return message || "We could not complete this request. Please try again.";
}

function isIncompleteResponse(error: unknown) {
  return (error instanceof Error ? error.message : "").toLowerCase().includes("incomplete");
}

export function AuthShowcase({ onClose, onSuccess }: AuthShowcaseProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [learningTopic, setLearningTopic] = useState<(typeof LEARNING_TOPICS)[number]>(LEARNING_TOPICS[0]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isSignIn = mode === "signin";

  const switchMode = (next: AuthMode) => { setMode(next); setError(""); setPassword(""); setConfirmPassword(""); };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password || (!isSignIn && !fullName.trim())) return setError("Please complete all required fields.");
    if (!isSignIn && password.length < 8) return setError("Use at least 8 characters for your password.");
    if (!isSignIn && password !== confirmPassword) return setError("Your passwords do not match.");
    setLoading(true); setError("");
    try {
      if (isSignIn) await Parse.User.logIn(cleanEmail, password);
      else {
        const user = new Parse.User();
        user.set("username", cleanEmail); user.set("email", cleanEmail); user.set("password", password);
        user.set("fullName", fullName.trim()); user.set("learningTopic", learningTopic);
        try {
          await user.signUp();
        } catch (signUpError) {
          // A connection can close after the account has safely been created.
          // In that case, signing in confirms the account without creating it twice.
          if (!isIncompleteResponse(signUpError)) throw signUpError;
          await Parse.User.logIn(cleanEmail, password);
        }
      }
      onSuccess(); onClose();
    } catch (submitError) { setError(getErrorMessage(submitError)); }
    finally { setLoading(false); }
  };

  return <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#111827]/65 p-3 backdrop-blur-sm sm:p-6">
    <motion.div initial={{ opacity: 0, scale: 0.96, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.28, ease: "easeOut" }} className="relative w-full max-w-[830px] overflow-hidden rounded-[1.5rem] bg-white shadow-[0_22px_70px_rgba(28,20,65,.32)] sm:rounded-[2rem] md:grid md:grid-cols-[1.12fr_.88fr]">
      <button type="button" onClick={onClose} aria-label="Close authentication" className="absolute right-3 top-3 z-20 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-[#f1effa] text-[#5c3bb2] transition hover:bg-[#e2dcf5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6538c7]"><X className="h-4 w-4" /></button>
      <section className="px-6 py-7 sm:px-10 sm:py-8 md:px-11">
        <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#7453c6]"><Leaf className="h-4 w-4" /> Smart Ubuhinzi</p>
        <h1 className="mt-2 text-2xl font-extrabold text-[#1d2431] sm:text-3xl">{isSignIn ? "Sign In" : "Create Account"}</h1>
        <p className="mt-1 text-sm text-[#7b8491]">{isSignIn ? "Welcome back. Continue your farming journey." : "Set up your secure farmer workspace."}</p>
        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <AnimatePresence initial={false}>{!isSignIn && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden"><InputRow icon={<UserRound className="h-4 w-4" />}><input value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" placeholder="Full name" className="compact-auth-input" /></InputRow></motion.div>}</AnimatePresence>
          <InputRow icon={<Mail className="h-4 w-4" />}><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" placeholder="Email address" className="compact-auth-input" /></InputRow>
          <InputRow icon={<LockKeyhole className="h-4 w-4" />}><input value={password} onChange={(event) => setPassword(event.target.value)} type={showPassword ? "text" : "password"} autoComplete={isSignIn ? "current-password" : "new-password"} placeholder="Password" className="compact-auth-input" /><PasswordToggle shown={showPassword} onToggle={() => setShowPassword((value) => !value)} /></InputRow>
          <AnimatePresence initial={false}>{!isSignIn && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-3 overflow-hidden"><InputRow icon={<LockKeyhole className="h-4 w-4" />}><input value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" placeholder="Confirm password" className="compact-auth-input" /><PasswordToggle shown={showConfirmPassword} onToggle={() => setShowConfirmPassword((value) => !value)} /></InputRow><select value={learningTopic} onChange={(event) => setLearningTopic(event.target.value as (typeof LEARNING_TOPICS)[number])} aria-label="Learning interest" className="w-full cursor-pointer rounded-lg border border-[#e5e8ee] bg-[#f6f7fa] px-4 py-2.5 text-sm text-[#485466] outline-none transition focus:border-[#6538c7] focus:ring-2 focus:ring-[#6538c7]/15">{LEARNING_TOPICS.map((topic) => <option key={topic}>{topic}</option>)}</select></motion.div>}</AnimatePresence>
          {isSignIn && <div className="flex items-center justify-between text-xs"><label className="flex cursor-pointer items-center gap-2 text-[#6e7885]"><input type="checkbox" className="accent-[#6538c7]" /> Remember me</label><span className="text-[#7652c8]">Secure access</span></div>}
          {error && <p role="alert" className="rounded-lg bg-[#fff0f0] px-3 py-2 text-xs font-semibold text-[#bd3030]">{error}</p>}
          <button type="submit" disabled={loading} className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#6036bf] px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_18px_rgba(96,54,191,.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#512ca9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6036bf] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">{loading && <Loader2 className="h-4 w-4 animate-spin" />}{isSignIn ? "SIGN IN" : "CREATE ACCOUNT"}</button>
        </form>
        <p className="mt-4 text-center text-xs text-[#7b8491]">{isSignIn ? "New here? " : "Already registered? "}<button type="button" onClick={() => switchMode(isSignIn ? "register" : "signin")} className="cursor-pointer font-bold text-[#6036bf] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6036bf]">{isSignIn ? "Create an account" : "Sign in"}</button></p>
      </section>
      <section className="relative flex min-h-[205px] items-center overflow-hidden bg-gradient-to-br from-[#7650d4] to-[#47229e] px-7 py-8 text-white sm:px-10 md:min-h-0 md:rounded-bl-[6.5rem]">
        <div className="absolute -right-20 -top-16 h-64 w-64 rounded-full border-[32px] border-white/10" /><div className="absolute -bottom-20 left-10 h-40 w-40 rounded-full bg-[#ae92ff]/25 blur-2xl" />
        <div className="relative max-w-[250px]"><p className="text-xs font-bold uppercase tracking-[.2em] text-white/70">Farmer portal</p><h2 className="mt-3 text-3xl font-extrabold leading-none sm:text-4xl">{isSignIn ? "Hello, Friend!" : "Welcome back!"}</h2><p className="mt-4 text-sm leading-6 text-white/85">{isSignIn ? "Register to use all of our smart farming features." : "Sign in to access your dashboard and farming tools."}</p><button type="button" onClick={() => switchMode(isSignIn ? "register" : "signin")} className="mt-6 cursor-pointer rounded-lg border border-white/65 px-5 py-2 text-xs font-bold transition hover:bg-white hover:text-[#6036bf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">{isSignIn ? "SIGN UP" : "SIGN IN"}</button></div>
      </section>
    </motion.div>
  </div>;
}

function InputRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) { return <label className="flex items-center gap-3 rounded-lg border border-[#e5e8ee] bg-[#f6f7fa] px-3 text-[#8490a0] transition focus-within:border-[#6538c7] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#6538c7]/15">{icon}{children}</label>; }
function PasswordToggle({ shown, onToggle }: { shown: boolean; onToggle: () => void }) { return <button type="button" onClick={onToggle} aria-label={shown ? "Hide password" : "Show password"} className="cursor-pointer p-1 text-[#6e5aa7] transition hover:text-[#6036bf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6036bf]">{shown ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>; }
