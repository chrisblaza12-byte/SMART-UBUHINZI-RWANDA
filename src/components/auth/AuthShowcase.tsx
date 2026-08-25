import Parse from "../../parse";
import { getAdminName } from "../../lib/authAccess";
import { Eye, EyeOff, Leaf, Loader2, LockKeyhole, Mail, UserRound, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LEARNING_TOPICS } from "../../content/authContent";

type AuthShowcaseProps = { onClose: () => void; onSuccess: () => void };
type AuthMode = "signin" | "register";

function getErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  const normalized = message.toLowerCase();
  if (normalized.includes("unexpected end of json") || normalized.includes("is not valid json")) return "The server returned a web page instead of an account response. Confirm VITE_PARSE_SERVER_URL is exactly https://parseapi.back4app.com/parse, and that your Back4App keys belong to the same application.";
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
  const [resetMessage, setResetMessage] = useState("");
  const isSignIn = mode === "signin";

  const switchMode = (next: AuthMode) => { setMode(next); setError(""); setResetMessage(""); setPassword(""); setConfirmPassword(""); };
  const handleForgotPassword = async () => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return setError("Enter your email address first, then choose forgot password.");
    setLoading(true); setError(""); setResetMessage("");
    try {
      await Parse.User.requestPasswordReset(cleanEmail);
      setResetMessage("Password reset instructions have been sent to your email.");
    } catch (resetError) { setError(getErrorMessage(resetError)); }
    finally { setLoading(false); }
  };
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
        user.set("fullName", getAdminName(cleanEmail) || fullName.trim());
        user.set("role", getAdminName(cleanEmail) ? "admin" : "farmer");
        user.set("learningTopic", learningTopic);
        try {
          await user.signUp();
        } catch (signUpError) {
          // A connection can close after the account has safely been created.
          // In that case, signing in confirms the account without creating it twice.
          if (!isIncompleteResponse(signUpError)) throw signUpError;
          await Parse.User.logIn(cleanEmail, password);
        }
      }
      const signedInUser = Parse.User.current();
      if (signedInUser) {
        const profileQuery = new Parse.Query("FarmerProfile");
        profileQuery.equalTo("user", signedInUser);
        const profile = await profileQuery.first();
        const farmerProfile = profile || new Parse.Object("FarmerProfile");
        farmerProfile.set("user", signedInUser);
        farmerProfile.set("fullName", String(signedInUser.get("fullName") || fullName.trim()));
        farmerProfile.set("email", cleanEmail);
        farmerProfile.set("role", getAdminName(cleanEmail) ? "admin" : "farmer");
        farmerProfile.set("status", "active");
        farmerProfile.set("learningTopic", learningTopic);
        await farmerProfile.save();
      }
      onSuccess(); onClose();
    } catch (submitError) { setError(getErrorMessage(submitError)); }
    finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-[#0b1d29]/95 p-3 backdrop-blur-sm sm:p-5">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative flex w-full max-w-[540px] items-center justify-center py-2 sm:py-0"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close authentication"
          className="absolute right-3 top-3 z-30 grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-[#2c4f78] bg-[#112b3f] text-[#8ad9ff] transition hover:bg-[#18324d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ec8ff]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative flex h-[min(500px,calc(100dvh-24px))] w-[min(500px,calc(100vw-24px))] max-w-[500px] items-center justify-center rounded-full border border-[#4da5f5]/40 bg-[#0e2233] shadow-[0_0_55px_rgba(34,153,255,0.22)] sm:h-[min(500px,calc(100dvh-40px))] sm:w-[min(500px,calc(100vw-40px))]">
          <motion.div
            className="absolute inset-[16px] rounded-full border border-[#7bc8ff]/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
            style={{
              background: "radial-gradient(circle at center, rgba(21, 51, 75, 0.92) 0%, rgba(9, 24, 35, 0.96) 62%, rgba(6, 14, 23, 1) 100%)",
            }}
          />

          <motion.div
            className="absolute inset-[12px] rounded-full opacity-80"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, ease: "linear", repeat: Infinity }}
            style={{
              backgroundImage:
                "repeating-conic-gradient(from 0deg, rgba(122, 214, 255, 0.9) 0deg 4deg, rgba(122, 214, 255, 0.08) 4deg 10deg)",
              WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 18px), #000 0)",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 18px), #000 0)",
            }}
          />

          <div className="absolute left-11 top-1/2 h-10 w-3 -translate-y-1/2 rounded-full bg-[#7ad0ff] shadow-[0_0_12px_rgba(122,208,255,0.9)]" />
          <div className="absolute right-11 top-1/2 h-10 w-3 -translate-y-1/2 rounded-full bg-[#7ad0ff]/60 shadow-[0_0_10px_rgba(122,208,255,0.7)]" />
          <div className="absolute inset-[42px] rounded-full border border-[#4aa9ff]/35" />

          <div className="relative z-10 max-h-[calc(100%_-_56px)] w-[82%] max-w-[300px] overflow-y-auto rounded-[34px] px-2 py-3 sm:px-3 sm:py-4">
            <h1 className="mb-3 text-center text-3xl font-bold tracking-wide text-[#bfefff] sm:mb-4 sm:text-4xl">
              {isSignIn ? "Login" : "Register"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
              <AnimatePresence initial={false}>
                {!isSignIn && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <TextInput
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      type="text"
                      placeholder="Full name"
                      autoComplete="name"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <TextInput
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="Email"
                autoComplete="email"
              />

              <div className="relative">
                <TextInput
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete={isSignIn ? "current-password" : "new-password"}
                />
                <PasswordToggle shown={showPassword} onToggle={() => setShowPassword((value) => !value)} />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={loading}
                  className="cursor-pointer text-[11px] font-semibold text-[#6ad0ff] transition hover:text-[#bfefff] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Forgot password?
                </button>
              </div>

              <AnimatePresence initial={false}>
                {!isSignIn && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="overflow-hidden space-y-3"
                  >
                    <div className="relative">
                      <TextInput
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm password"
                        autoComplete="new-password"
                      />
                      <PasswordToggle shown={showConfirmPassword} onToggle={() => setShowConfirmPassword((value) => !value)} />
                    </div>

                    <select
                      value={learningTopic}
                      onChange={(event) => setLearningTopic(event.target.value as (typeof LEARNING_TOPICS)[number])}
                      aria-label="Learning interest"
                      className="min-h-11 w-full rounded-xl border border-[#1b9fff]/60 bg-[#0d2a3d] px-3 py-2.5 text-sm text-[#d7f0ff] outline-none transition focus:border-[#4ec8ff] focus:ring-2 focus:ring-[#4ec8ff]/25"
                    >
                      {LEARNING_TOPICS.map((topic) => (
                        <option key={topic} value={topic} className="bg-[#0d2a3d] text-[#d7f0ff]">
                          {topic}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <p role="alert" className="rounded-lg bg-[#ffeff1] px-2 py-1.5 text-[11px] font-medium text-[#d64545]">
                  {error}
                </p>
              )}
              {resetMessage && (
                <p role="status" className="rounded-lg bg-[#e8fff5] px-2 py-1.5 text-[11px] font-medium text-[#087f5b]">
                  {resetMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#2aa3ff] px-4 py-2.5 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_25px_rgba(42,163,255,0.45)] transition hover:bg-[#1a8eef] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSignIn ? "Login" : "Sign Up"}
              </button>
            </form>

            <div className="mt-4 text-center text-[11px] font-medium text-[#a8d9f7]">
              {isSignIn ? "Need an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => switchMode(isSignIn ? "register" : "signin")}
                className="cursor-pointer font-bold text-[#6ad0ff] hover:text-[#9fe5ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ec8ff]"
              >
                {isSignIn ? "Sign Up" : "Login"}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function TextInput({
  value,
  onChange,
  type,
  placeholder,
  autoComplete,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  placeholder: string;
  autoComplete?: string;
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="min-h-11 w-full rounded-full border border-[#3b9af2]/70 bg-[#102a3d]/90 px-4 py-2.5 text-sm text-[#eaf8ff] placeholder:text-[#7db7dd] outline-none transition focus:border-[#6ad0ff] focus:ring-2 focus:ring-[#6ad0ff]/30"
    />
  );
}

function PasswordToggle({ shown, onToggle }: { shown: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={shown ? "Hide password" : "Show password"}
      className="absolute right-2.5 top-1/2 grid h-9 w-9 -translate-y-1/2 cursor-pointer place-items-center text-[#9fe5ff] transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ec8ff]"
    >
      {shown ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );
}
