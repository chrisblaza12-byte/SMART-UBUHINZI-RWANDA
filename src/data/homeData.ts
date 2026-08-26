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

export const rwandaCrops = [
  "Maize", "Beans", "Rice", "Wheat", "Sorghum", "Cassava", "Sweet potatoes", "Irish potatoes",
  "Tomatoes", "Onions", "Cabbage", "Carrots", "Peas", "French beans", "Bananas", "Avocado",
  "Passion fruit", "Mangoes", "Pineapple", "Coffee", "Tea", "Pyrethrum", "Soybeans", "Groundnuts",
  "Sunflower", "Sugarcane", "Mushrooms", "Chili peppers", "Eggplant", "Amaranth",
] as const;

export const learningCourses = [
  { title: "Crop Health and Disease Recognition", duration: "25 min", summary: "Scout leaves, stems, roots, and fruit so you can identify problems early.", steps: ["Inspect a few plants in every part of the field twice a week.", "Record the crop, symptoms, location, and date with a photo.", "Separate badly affected plants and ask an extension officer for confirmation."] },
  { title: "Safe Treatment and Pest Management", duration: "30 min", summary: "Choose safe treatment steps, protect your family, and reduce pesticide misuse.", steps: ["Start with clean seed, field hygiene, spacing, rotation, and hand removal.", "Use only an approved product and follow its label dose and waiting period.", "Wear protective clothing, keep children away, and never pour leftovers into water."] },
  { title: "Healthy Soil and Better Yields", duration: "20 min", summary: "Improve soil fertility with rotation, compost, mulch, and responsible nutrients.", steps: ["Rotate crops and keep soil covered with mulch or suitable living cover.", "Return mature compost and manure to the field in the correct amount.", "Apply fertilizer after checking crop needs, soil condition, and rainfall timing."] },
  { title: "Water, Weather, and Climate-Smart Farming", duration: "18 min", summary: "Plan planting, irrigation, drainage, and field work around changing weather.", steps: ["Plant with the season forecast and choose varieties suited to the district.", "Water early, conserve moisture with mulch, and keep excess water draining.", "Avoid spraying before rain and protect harvested crops from wet conditions."] },
  { title: "Harvest, Storage, and Market Readiness", duration: "22 min", summary: "Reduce post-harvest loss and prepare clean, quality produce for buyers.", steps: ["Harvest at the right maturity and keep damaged produce separate.", "Dry grains fully and store them in clean, dry, pest-safe containers.", "Compare district prices, grade produce honestly, and keep simple sales records."] },
] as const;

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
