// Central content file for easy editing in VS Code.
// Update text and image paths here without touching component logic.

export const heroWords = ["Grow Smarter", "Sell Faster", "Predict Better", "Harvest More"];

export const heroInfoCards = [
  "Today's Weather",
  "Crop Prices",
  "Healthy Crops",
  "Live Marketplace",
];

export const navSlides = [
  {
    title: "Maize Fields of Rwanda",
    tag: "Crop Spotlight",
    tint: "rgba(22,101,52,0.6)",
    image: "/images/nav-slide-1.jpg",
  },
  {
    title: "Coffee Farmers at Work",
    tag: "Farmer Story",
    tint: "rgba(120,53,15,0.55)",
    image: "/images/nav-slide-2.jpg",
  },
  {
    title: "Bean Harvest Season",
    tag: "Crop Spotlight",
    tint: "rgba(21,94,117,0.55)",
    image: "/images/nav-slide-3.jpg",
  },
  {
    title: "Women Leading Cooperatives",
    tag: "Farmer Story",
    tint: "rgba(88,28,135,0.5)",
    image: "/images/nav-slide-4.jpg",
  },
  {
    title: "Vegetable Growers of Musanze",
    tag: "Crop Spotlight",
    tint: "rgba(6,95,70,0.55)",
    image: "/images/nav-slide-5.jpg",
  },
];

export type CropTopicKey =
  | "Overview"
  | "History"
  | "Cultivation"
  | "Pests"
  | "Market"
  | "Climate"
  | "Storage"
  | "Innovation";

export const cropTopicTabs: CropTopicKey[] = [
  "Overview",
  "History",
  "Cultivation",
  "Pests",
  "Market",
  "Climate",
  "Storage",
  "Innovation",
];

export type CropGuideContent = {
  id: string;
  title: string;
  icon: "maize" | "beans" | "coffee";
  summary: string;
  coverImage: string;
  galleryImages: string[];
  topics: Record<CropTopicKey, string>;
};

export const cropGuides: CropGuideContent[] = [
  {
    id: "maize",
    title: "Maize",
    icon: "maize",
    summary: "High-yield cereal crop for food and market income in all provinces.",
    coverImage: "/maize.webp",
    galleryImages: [
      "/kk.jpg",
      "/maize.webp",
      "/images/maize-3.jpg",
      "/images/maize-4.jpg",
      "/images/maize-5.jpg",
      "/images/maize-6.jpg",
      "/images/maize-7.jpg",
      "/images/maize-8.jpg",
    ],
    topics: {
      Overview:
        "Maize is one of the most important staple crops for food security in Rwanda. It supports household nutrition and feed production.",
      History:
        "Maize cultivation expanded strongly in Rwanda after crop intensification programs, becoming a strategic crop in many districts.",
      Cultivation:
        "Use certified seeds, correct spacing, timely weeding, and split fertilizer application for stronger yield and healthy cobs.",
      Pests:
        "Key threats include fall armyworm and stem borers. Early scouting and integrated pest management reduce losses.",
      Market:
        "Dry grains to safe moisture, clean well, and sell through cooperatives or digital market platforms for better pricing.",
      Climate:
        "Maize performs well with moderate rainfall. Use water conservation techniques and drought-tolerant varieties where needed.",
      Storage:
        "Store maize in dry, ventilated places with moisture control to prevent aflatoxin and post-harvest losses.",
      Innovation:
        "Use mobile weather alerts, disease reporting, and district price dashboards for faster farming decisions.",
    },
  },
  {
    id: "beans",
    title: "Beans",
    icon: "beans",
    summary: "Protein-rich crop with strong local demand and fast seasonal turnover.",
    coverImage: "/images/beans-cover.jpg",
    galleryImages: [
      "/bean.webp",
      "/images/beans-2.jpg",
      "/images/beans-3.jpg",
      "/images/beans-4.jpg",
      "/images/beans-5.jpg",
      "/images/beans-6.jpg",
      "/images/beans-7.jpg",
      "/images/beans-8.jpg",
    ],
    topics: {
      Overview:
        "Beans are central to nutrition and are grown by many smallholder farmers for home consumption and local sale.",
      History:
        "Traditional bean varieties have been cultivated for generations across Rwanda, with improved seeds now increasing productivity.",
      Cultivation:
        "Plant on time, inoculate or treat seeds, and use proper row spacing and mulching for healthier growth.",
      Pests:
        "Common issues include bean fly and fungal diseases. Rotation and clean field management help prevention.",
      Market:
        "Sort by quality, remove damaged grains, and package cleanly to secure premium buyers in markets and institutions.",
      Climate:
        "Beans are sensitive to excess moisture. Ensure drainage and avoid repeated planting in waterlogged plots.",
      Storage:
        "Use hermetic storage bags and dry beans properly before storage to minimize insect damage.",
      Innovation:
        "Community extension services and mobile advisory apps now support bean disease alerts and treatment plans.",
    },
  },
  {
    id: "coffee",
    title: "Coffee",
    icon: "coffee",
    summary: "Premium export crop requiring strong farm management and quality post-harvest handling.",
    coverImage: "/images/coffee-cover.jpg",
    galleryImages: [
      "/images/coffee-1.jpg",
      "/images/coffee-2.jpg",
      "/images/coffee-3.jpg",
      "/images/coffee-4.jpg",
      "/images/coffee-5.jpg",
      "/images/coffee-6.jpg",
      "/images/coffee-7.jpg",
      "/images/coffee-8.jpg",
    ],
    topics: {
      Overview:
        "Coffee is a high-value crop for Rwanda with significant contribution to exports and rural household incomes.",
      History:
        "Coffee has a long production history in Rwanda, with quality improvements boosting international recognition.",
      Cultivation:
        "Regular pruning, nutrient management, and shade control are essential for strong and consistent yields.",
      Pests:
        "Main threats include coffee leaf rust and berry borer. Monitoring and preventive spray schedules are critical.",
      Market:
        "Quality grading, cherry selection, and proper washing/drying determine premium market access and export prices.",
      Climate:
        "Coffee prefers specific altitude and rainfall patterns. Climate-smart practices help protect farm productivity.",
      Storage:
        "Store parchment and green coffee in cool, dry conditions to maintain quality and flavor profile.",
      Innovation:
        "Digital traceability and smart extension support help farmers track quality and connect with better buyers.",
    },
  },
];

export const aboutBookImages = {
  cover: "/images/about-cover.jpg",
  inline: "/images/about-inline.jpg",
};

export const farmerNewsItems = [
  {
    title: "Fall Armyworm Alert for Maize Growers",
    category: "Crop Protection",
    date: "12 Jan 2026",
    image: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1200&q=85",
    summary:
      "Farmers in Eastern Province report early signs of fall armyworm. Early scouting and prevention recommended now.",
    paragraphs: [
      "Maize farmers in Rwanda's Eastern Province should begin field scouting as soon as seedlings emerge. Fall armyworm can spread quickly, especially when warm nights and fresh maize leaves provide ideal feeding conditions.",
      "Walk through the field twice a week and inspect the newest leaves and the whorl at the centre of each plant. Look for small holes, fresh green droppings, and caterpillars hiding deep inside the whorl.",
      "Farmers should contact their local extension officer before applying any crop protection product. Use the recommended product, dose, protective clothing, and waiting period to protect the harvest and the farming family.",
    ],
  },
  {
    title: "Coffee Prices Rise This Season",
    category: "Market Update",
    date: "18 Jan 2026",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85",
    summary:
      "Coffee farmers in Nyamasheke and Huye are seeing better prices this month due to strong export demand.",
    paragraphs: [
      "Coffee cooperatives in Nyamasheke and Huye are reporting stronger demand for carefully sorted, well-dried cherries. Quality at the farm can make a real difference when coffee reaches the washing station and export market.",
      "Harvest only ripe red cherries, keep the crop free from leaves and stones, and deliver it promptly. Clean harvesting reduces losses and helps cooperatives maintain a consistent profile for buyers.",
      "Before selling, compare the latest cooperative and district price information. Keeping simple records of labour, transport, and inputs makes it easier to understand the true return from each season.",
    ],
  },
  {
    title: "New Bean Seed Variety Released",
    category: "Innovation",
    date: "22 Jan 2026",
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=1200&q=85",
    summary:
      "A new disease-resistant bean variety is now available through district cooperatives for the next planting season.",
    paragraphs: [
      "A new disease-resistant bean variety is becoming available through district cooperatives ahead of the next planting season. It is intended to help farmers reduce losses from common bean diseases while maintaining dependable household nutrition.",
      "Buy certified seed from a trusted cooperative and follow the spacing and planting guidance supplied with it. Do not mix new seed with unknown grain kept from the previous harvest.",
      "Test a small plot first and compare growth, disease pressure, and yield with the variety already used on the farm. Share observations with the cooperative to help farmers choose varieties suited to their soil and rainfall.",
    ],
  },
  {
    title: "Rainy Season Planning Tips",
    category: "Weather & Farming",
    date: "27 Jan 2026",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=85",
    summary:
      "Agronomists recommend adjusting planting schedules ahead of the coming rainy season across most districts.",
    paragraphs: [
      "The next rainy season is a useful moment to prepare fields, seed, tools, and storage before the first dependable rains arrive. Planting too early into dry soil can leave seed exposed, while planting too late can shorten the growing period.",
      "Clear drainage channels on sloping land, strengthen terraces, and add organic matter where the soil is weak. These preparations help reduce erosion and allow rainwater to support the crop instead of washing away fertile topsoil.",
      "Watch district weather updates and speak with an extension officer about the best planting window for your crop. Keep a short farm calendar for planting, weeding, pest checks, and harvesting.",
    ],
  },
];
