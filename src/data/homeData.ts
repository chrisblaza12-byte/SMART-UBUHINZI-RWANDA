import {
  BookOpen,
  Bot,
  CloudSun,
  GraduationCap,
  HandCoins,
  Leaf,
  Microscope,
  ShieldCheck,
  ShoppingCart,
  Sprout,
  Tractor,
  TrendingUp,
  Upload,
  Users,
  Wind,
  Zap,
} from "lucide-react";

export const quickServices = [
  {
    title: "Market Prices",
    description: "See daily crop prices by district and compare trends.",
    icon: TrendingUp,
    cta: "Check Prices",
  },
  {
    title: "Weather Forecast",
    description: "Track rain, temperature, humidity, and wind in real-time.",
    icon: CloudSun,
    cta: "View Forecast",
  },
  {
    title: "AI Crop Diagnosis",
    description: "Upload leaf photos and get disease detection with treatment tips.",
    icon: Bot,
    cta: "Try Diagnosis",
  },
  {
    title: "Sell Your Crops",
    description: "Post produce in minutes and connect with trusted buyers.",
    icon: ShoppingCart,
    cta: "Start Selling",
  },
  {
    title: "Soil Testing",
    description: "Track fertility and choose the right nutrient plan for each season.",
    icon: Microscope,
    cta: "Check Soil",
  },
  {
    title: "Farm Mechanization",
    description: "Access modern farm tools and machinery support by district.",
    icon: Tractor,
    cta: "View Tools",
  },
  {
    title: "Expert Advisory",
    description: "Ask agronomists and receive personalized crop care recommendations.",
    icon: Users,
    cta: "Ask Expert",
  },
  {
    title: "Learning Modules",
    description: "Join guided lessons for crop health, post-harvest, and market readiness.",
    icon: GraduationCap,
    cta: "Start Learning",
  },
];

export const coreServices = [
  { title: "Crop Prices", icon: TrendingUp },
  { title: "Weather Forecast", icon: CloudSun },
  { title: "AI Disease Detection", icon: Bot },
  { title: "Marketplace", icon: HandCoins },
  { title: "Learning Center", icon: GraduationCap },
  { title: "Agricultural Experts", icon: Users },
];

export const learningOptions = [
  { title: "Pest & Disease Management", icon: BookOpen },
  { title: "Soil Health and Fertility", icon: Leaf },
  { title: "Irrigation Best Practices", icon: CloudSun },
  { title: "Harvest and Post-Harvest", icon: ShoppingCart },
];

export const whyChooseUs = [
  {
    title: "Fast",
    description: "Get instant updates from weather, prices, and buyers.",
    icon: Zap,
  },
  {
    title: "Secure",
    description: "Your account and data stay protected with modern security.",
    icon: ShieldCheck,
  },
  {
    title: "Reliable",
    description: "Built for farmers with consistent tools every day.",
    icon: Leaf,
  },
  {
    title: "Easy to Use",
    description: "Simple design for phone, tablet, and desktop devices.",
    icon: Sprout,
  },
];

export const featuredProducts = ["Beans", "Maize", "Rice", "Tomatoes", "Coffee", "Potatoes"];

export const rwandaDistricts = [
  "Gasabo",
  "Kicukiro",
  "Nyarugenge",
  "Bugesera",
  "Gatsibo",
  "Kayonza",
  "Kirehe",
  "Ngoma",
  "Nyagatare",
  "Rwamagana",
  "Burera",
  "Gakenke",
  "Gicumbi",
  "Musanze",
  "Rulindo",
  "Gisagara",
  "Huye",
  "Kamonyi",
  "Muhanga",
  "Nyamagabe",
  "Nyanza",
  "Nyaruguru",
  "Ruhango",
  "Karongi",
  "Ngororero",
  "Nyabihu",
  "Nyamasheke",
  "Rubavu",
  "Rusizi",
  "Rutsiro",
];

export const weatherCards = [
  { label: "Temperature", value: "24°C", icon: CloudSun },
  { label: "Humidity", value: "68%", icon: Leaf },
  { label: "Wind", value: "12 km/h", icon: Wind },
  { label: "Rain", value: "40%", icon: CloudSun },
];

export const aiSteps = [
  { title: "Upload crop image", icon: Upload },
  { title: "AI scans leaf", icon: Bot },
  { title: "Disease identified", icon: ShieldCheck },
  { title: "Treatment suggested", icon: Leaf },
];
