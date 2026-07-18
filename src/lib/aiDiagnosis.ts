// Simple "instant result" generator for crop testing.
// Easy to edit: just update the diseaseLibrary list below with more crops/diseases.

export type DiagnosisResult = {
  cropName: string;
  diseaseName: string;
  confidence: number;
  treatment: string;
};

const diseaseLibrary: { keyword: string; diseaseName: string; treatment: string }[] = [
  {
    keyword: "maize",
    diseaseName: "Maize Leaf Blight",
    treatment: "Remove infected leaves, rotate crops next season, and apply a recommended fungicide early morning.",
  },
  {
    keyword: "bean",
    diseaseName: "Bean Rust",
    treatment: "Improve spacing for airflow, remove affected leaves, and apply sulfur-based fungicide if it spreads.",
  },
  {
    keyword: "coffee",
    diseaseName: "Coffee Leaf Rust",
    treatment: "Prune affected branches, improve shade balance, and apply copper-based fungicide preventively.",
  },
  {
    keyword: "tomato",
    diseaseName: "Tomato Blight",
    treatment: "Remove infected leaves immediately, avoid overhead watering, and apply approved fungicide.",
  },
  {
    keyword: "potato",
    diseaseName: "Potato Late Blight",
    treatment: "Destroy infected plants, avoid working in wet fields, and apply protective fungicide spray.",
  },
];

const fallbackResult = {
  diseaseName: "Early Stress Signs",
  treatment: "Monitor the crop for 3-5 days, ensure good watering and drainage, and re-test if symptoms continue.",
};

// Generates a instant, simulated diagnosis result based on crop name text.
// Replace this logic later with a real AI/ML API call when ready.
export function generateInstantDiagnosis(cropName: string): DiagnosisResult {
  const normalized = cropName.trim().toLowerCase();
  const match = diseaseLibrary.find((item) => normalized.includes(item.keyword));

  const confidence = 78 + Math.floor(Math.random() * 18); // 78% - 95%

  return {
    cropName: cropName.trim() || "Unknown crop",
    diseaseName: match ? match.diseaseName : fallbackResult.diseaseName,
    confidence,
    treatment: match ? match.treatment : fallbackResult.treatment,
  };
}
