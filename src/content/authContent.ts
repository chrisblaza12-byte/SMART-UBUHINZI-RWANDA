import { ShieldCheck, Sprout, Users } from "lucide-react";

export const AUTH_SLIDES = [
  {
    title: "Farmer Command Center",
    description: "Track weather alerts, crop updates, and AI crop support from one secure account.",
    icon: Sprout,
  },
  {
    title: "Protected Admin Control",
    description: "Only approved administrators can control users, approvals, and sensitive platform actions.",
    icon: Users,
  },
  {
    title: "Instant Crop Testing",
    description: "Upload crop photos and receive diagnosis guidance with treatment suggestions in minutes.",
    icon: ShieldCheck,
  },
] as const;

export const LEARNING_TOPICS = [
  "Pest & Disease Management",
  "Soil Nutrition",
  "Irrigation Basics",
  "Post-Harvest Handling",
  "Market Planning",
] as const;

export const AUTH_COPY = {
  signInTitle: "Welcome Back",
  registerTitle: "Create Your Account",
  signInDescription: "Sign in with your registered email and password to open your dashboard.",
  registerDescription: "Register once and unlock crop testing, weather tools, and learning modules.",
};
