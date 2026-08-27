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
  { title: "Crop Health and Disease Recognition", titleRw: "Kumenya ubuzima bw'ibihingwa n'indwara", duration: "25 min", summary: "Scout leaves, stems, roots, and fruit so you can identify problems early.", summaryRw: "Suzuma amababi, ibiti, imizi n'imbuto kugira ngo umenye ibibazo hakiri kare.", steps: ["Inspect a few plants in every part of the field twice a week.", "Record the crop, symptoms, location, and date with a photo.", "Separate badly affected plants and ask an extension officer for confirmation."], stepsRw: ["Suzuma ibihingwa bike muri buri gice cy'umurima kabiri mu cyumweru.", "Andika igihingwa, ibimenyetso, aho biri n'itariki, ufate n'ifoto.", "Tandukanya ibihingwa byafashwe cyane ubaze umujyanama w'ubuhinzi."] },
  { title: "Safe Treatment and Pest Management", titleRw: "Kuvura neza no kurwanya udukoko", duration: "30 min", summary: "Choose safe treatment steps, protect your family, and reduce pesticide misuse.", summaryRw: "Hitamo uburyo bwo kuvura butekanye, urinde umuryango kandi wirinde gukoresha imiti nabi.", steps: ["Start with clean seed, field hygiene, spacing, rotation, and hand removal.", "Use only an approved product and follow its label dose and waiting period.", "Wear protective clothing, keep children away, and never pour leftovers into water."], stepsRw: ["Tangira imbuto nziza, isuku y'umurima, intera nziza, guhinduranya ibihingwa no gukuramo udukoko n'intoki.", "Koresha umuti wemewe gusa ukurikize igipimo n'igihe cyo gutegereza.", "Ambara ubwirinzi, abana babe kure, kandi ntusuke ibisigazwa mu mazi."] },
  { title: "Healthy Soil and Better Yields", titleRw: "Ubutaka buzira umuze n'umusaruro mwiza", duration: "20 min", summary: "Improve soil fertility with rotation, compost, mulch, and responsible nutrients.", summaryRw: "Ongera uburumbuke bw'ubutaka ukoresheje guhinduranya ibihingwa, ifumbire n'ibikingira ubutaka.", steps: ["Rotate crops and keep soil covered with mulch or suitable living cover.", "Return mature compost and manure to the field in the correct amount.", "Apply fertilizer after checking crop needs, soil condition, and rainfall timing."], stepsRw: ["Hinduranya ibihingwa kandi ubutaka uburinde ukoresheje ibisigazwa cyangwa ibimera bibukingira.", "Subiza ifumbire iboze neza n'imborera mu murima ku rugero rukwiye.", "Koresha ifumbire umaze kureba ibyo igihingwa gikeneye, ubutaka n'imvura."] },
  { title: "Water, Weather, and Climate-Smart Farming", titleRw: "Amazi, ikirere n'ubuhinzi buhangana n'imihindagurikire", duration: "18 min", summary: "Plan planting, irrigation, drainage, and field work around changing weather.", summaryRw: "Teganya gutera, kuhira, kuvoma amazi no gukora mu murima ukurikije ikirere gihinduka.", steps: ["Plant with the season forecast and choose varieties suited to the district.", "Water early, conserve moisture with mulch, and keep excess water draining.", "Avoid spraying before rain and protect harvested crops from wet conditions."], stepsRw: ["Tera ukurikije iteganyagihe kandi uhitemo imbuto zijyanye n'akarere.", "Kuhira kare, ubike ubuhehere ukoresheje ibisigazwa kandi ukure amazi menshi.", "Irinde gutera umuti mbere y'imvura kandi urinde umusaruro w'ejo."] },
  { title: "Harvest, Storage, and Market Readiness", titleRw: "Gusarura, kubika no gutegura umusaruro ku isoko", duration: "22 min", summary: "Reduce post-harvest loss and prepare clean, quality produce for buyers.", summaryRw: "Gabanya igihombo nyuma yo gusarura utegure umusaruro usukuye kandi mwiza ku baguzi.", steps: ["Harvest at the right maturity and keep damaged produce separate.", "Dry grains fully and store them in clean, dry, pest-safe containers.", "Compare district prices, grade produce honestly, and keep simple sales records."], stepsRw: ["Sarura igihe gikwiye kandi utandukanye umusaruro wangiritse.", "Yumisha ibinyampeke neza ubibike mu bikoresho bisukuye, byumye kandi birinda udukoko.", "Gereranya ibiciro by'uturere, shyira umusaruro mu byiciro kandi wandike ibyo wagurishije."] },
] as const;

export const learningQuizzes = [
  [
    { question: "How often should you inspect different parts of the field?", questionRw: "Ni kangahe ugomba gusuzuma ibice bitandukanye by'umurima?", options: ["Twice a week", "Once a season", "Only at harvest"], optionsRw: ["Kabiri mu cyumweru", "Rimwe mu gihembwe", "Gusa mu gihe cyo gusarura"], answer: 0 },
    { question: "What should you record with a crop photo?", questionRw: "Ni iki wandikana n'ifoto y'igihingwa?", options: ["Symptoms, location, and date", "Only the weather", "The market price only"], optionsRw: ["Ibimenyetso, aho biri n'itariki", "Ikirere gusa", "Igiciro cyo ku isoko gusa"], answer: 0 },
    { question: "What should you do with badly affected plants?", questionRw: "Ukora iki ku bihingwa byafashwe cyane?", options: ["Separate them and ask an extension officer", "Mix them with healthy plants", "Sell them immediately"], optionsRw: ["Ubitandukanye ukabaza umujyanama w'ubuhinzi", "Ubivanga n'ibizima", "Uhite ubigurisha"], answer: 0 },
  ],
  [
    { question: "What is a good first step before using pesticides?", questionRw: "Ni iki wakora mbere yo gukoresha imiti yica udukoko?", options: ["Use field hygiene and hand removal first", "Double the dose", "Spray every day"], optionsRw: ["Koresha isuku y'umurima no gukuramo udukoko n'intoki", "Kongera igipimo kabiri", "Gutera buri munsi"], answer: 0 },
    { question: "Where do you find the correct pesticide dose?", questionRw: "Ni he ubona igipimo nyacyo cy'umuti?", options: ["On the approved product label", "From a guess", "From an unrelated crop"], optionsRw: ["Ku rupapuro rw'umuti wemewe", "Mu gukeka", "Ku gihingwa kitari cyo"], answer: 0 },
    { question: "What protects your family during spraying?", questionRw: "Ni iki kirinda umuryango wawe igihe utera umuti?", options: ["Protective clothing and keeping children away", "Letting children help", "Pouring leftovers in water"], optionsRw: ["Imyambaro y'ubwirinzi no gukura abana kure", "Kureka abana bagafasha", "Gusuka ibisigazwa mu mazi"], answer: 0 },
  ],
  [
    { question: "Why should farmers rotate crops?", questionRw: "Kuki abahinzi bahinduranya ibihingwa?", options: ["To support soil health and reduce problems", "To remove all soil cover", "To avoid using compost"], optionsRw: ["Kugira ngo barinde ubutaka kandi bagabanye ibibazo", "Kuvanaho ibikingira ubutaka byose", "Kwirinda ifumbire"], answer: 0 },
    { question: "What should be returned to the field in the right amount?", questionRw: "Ni iki gisubizwa mu murima ku rugero rukwiye?", options: ["Mature compost and manure", "Plastic waste", "Pesticide leftovers"], optionsRw: ["Ifumbire iboze neza n'imborera", "Imyanda ya pulasitiki", "Ibisigazwa by'imiti"], answer: 0 },
    { question: "When should you apply fertilizer?", questionRw: "Ni ryari ukoresha ifumbire?", options: ["After checking crop, soil, and rainfall needs", "Without checking anything", "Only after harvest"], optionsRw: ["Umaze kureba igihingwa, ubutaka n'imvura", "Utarebye na kimwe", "Gusa nyuma yo gusarura"], answer: 0 },
  ],
  [
    { question: "What should guide your planting time?", questionRw: "Ni iki kiyobora igihe cyo gutera?", options: ["The season forecast and suitable varieties", "A random date", "The market colour"], optionsRw: ["Iteganyagihe n'imbuto zijyanye n'akarere", "Itariki wahisemo uko wiboneye", "Ibara ry'isoko"], answer: 0 },
    { question: "How can you conserve soil moisture?", questionRw: "Wabika ute ubuhehere bw'ubutaka?", options: ["Use mulch and manage water", "Remove all soil cover", "Flood the field"], optionsRw: ["Ukoreshe ibisigazwa kandi ucunge amazi", "Uvanaho ibikingira ubutaka byose", "Wuzuze umurima amazi"], answer: 0 },
    { question: "When should you avoid spraying?", questionRw: "Ni ryari wirinda gutera umuti?", options: ["Just before rain", "On a calm dry morning", "After reading the label"], optionsRw: ["Mbere y'imvura", "Mu gitondo cyumye kandi gituje", "Nyuma yo gusoma amabwiriza"], answer: 0 },
  ],
  [
    { question: "What should be separated during harvest?", questionRw: "Ni iki gitandukanywa mu gihe cyo gusarura?", options: ["Damaged produce from good produce", "All produce from the field", "Clean grains from clean grains"], optionsRw: ["Umusaruro wangiritse n'umwiza", "Umusaruro wose n'umurima", "Ibinyampeke bisukuye n'ibisukuye"], answer: 0 },
    { question: "What is important before storing grains?", questionRw: "Ni iki cy'ingenzi mbere yo kubika ibinyampeke?", options: ["Dry them fully", "Keep them wet", "Mix them with pesticide leftovers"], optionsRw: ["Kubyumisha neza", "Kubibika bitose", "Kubivanga n'ibisigazwa by'imiti"], answer: 0 },
    { question: "What helps you sell at a fair price?", questionRw: "Ni iki kigufasha kugurisha ku giciro cyiza?", options: ["Compare district prices and keep records", "Hide the crop quality", "Ignore the market"], optionsRw: ["Kugereranya ibiciro by'uturere no kwandika", "Guhisha ubuziranenge bw'umusaruro", "Kwirengagiza isoko"], answer: 0 },
  ],
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
