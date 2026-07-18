import Parse from "../../parse";
import { Bot, CheckCircle2, Upload } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import { DiagnosisResult, generateInstantDiagnosis } from "../../lib/aiDiagnosis";

function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || "");
      resolve(result.includes(",") ? result.split(",")[1] : "");
    };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

export function CropTestPanel() {
  const [cropName, setCropName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cropName.trim() || !symptoms.trim() || !imageFile) {
      toast.error("Add crop name, symptoms, and a crop photo.");
      return;
    }

    const user = Parse.User.current();
    if (!user) {
      toast.error("Please login first.");
      return;
    }

    setSubmitting(true);
    setResult(null);
    try {
      const base64 = await toBase64(imageFile);
      const image = new Parse.File(imageFile.name, { base64 });
      await image.save();

      const instantResult = generateInstantDiagnosis(cropName);

      const diagnosis = new Parse.Object("CropDiagnosis");
      diagnosis.set("cropName", cropName.trim());
      diagnosis.set("symptoms", symptoms.trim());
      diagnosis.set("status", "diagnosed");
      diagnosis.set("createdBy", user);
      diagnosis.set("image", image);
      diagnosis.set("diseaseName", instantResult.diseaseName);
      diagnosis.set("confidence", instantResult.confidence);
      diagnosis.set("suggestion", instantResult.treatment);
      await diagnosis.save();

      setResult(instantResult);
      setCropName("");
      setSymptoms("");
      setImageFile(null);
      setPreviewUrl(null);
      toast.success("Result ready! See your crop diagnosis below.");
    } catch {
      toast.error("Could not submit crop test right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <article className="rounded-xl border border-[#CBD5E1] bg-white p-5 dark:border-[#334155] dark:bg-[#0F172A]">
      <h3 className="inline-flex items-center gap-2 font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
        <Bot className="h-5 w-5 text-[#22C55E]" /> Test Your Crop With Photo
      </h3>
      <p className="mt-1 text-sm text-[#64748B] dark:text-[#94A3B8]">
        Upload a crop photo and get your result instantly below the form.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="space-y-3">
          <input
            value={cropName}
            onChange={(event) => setCropName(event.target.value)}
            placeholder="Crop name (e.g. Maize)"
            className="w-full rounded-md border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2 text-sm text-[#0F172A] outline-none dark:border-[#334155] dark:bg-[#020617] dark:text-[#F8FAFC]"
          />
          <textarea
            value={symptoms}
            onChange={(event) => setSymptoms(event.target.value)}
            rows={4}
            placeholder="Describe what you see on the crop"
            className="w-full rounded-md border border-[#CBD5E1] bg-[#F8FAFC] px-3 py-2 text-sm text-[#0F172A] outline-none dark:border-[#334155] dark:bg-[#020617] dark:text-[#F8FAFC]"
          />
          <label className="flex cursor-pointer items-center gap-2 rounded-md border border-dashed border-[#22C55E]/60 bg-[#22C55E]/5 px-3 py-3 text-sm text-[#166534] dark:text-[#DCFCE7]">
            <Upload className="h-4 w-4" />
            {imageFile ? imageFile.name : "Upload crop photo"}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
          <button
            type="submit"
            disabled={submitting}
            className="w-full cursor-pointer rounded-md bg-[#22C55E] px-4 py-2 font-semibold text-[#052E16] transition-colors duration-200 hover:bg-[#4ADE80] disabled:opacity-70"
          >
            {submitting ? "Analyzing..." : "Test My Crop"}
          </button>
        </div>

        <div className="rounded-md border border-[#CBD5E1] bg-[#F8FAFC] p-3 dark:border-[#334155] dark:bg-[#020617]">
          {previewUrl ? (
            <img src={previewUrl} alt="Selected crop preview" className="h-56 w-full rounded-md object-cover" />
          ) : (
            <div className="flex h-56 items-center justify-center text-sm text-[#64748B] dark:text-[#94A3B8]">
              Image preview appears here
            </div>
          )}
        </div>
      </form>

      {result && (
        <div className="mt-5 rounded-lg border border-[#22C55E]/40 bg-[#22C55E]/10 p-4">
          <div className="inline-flex items-center gap-2 text-[#166534] dark:text-[#4ADE80]">
            <CheckCircle2 className="h-5 w-5" />
            <p className="font-semibold">Your Crop Result Is Ready</p>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <div className="rounded-md bg-white/70 p-3 dark:bg-[#020617]">
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Crop</p>
              <p className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{result.cropName}</p>
            </div>
            <div className="rounded-md bg-white/70 p-3 dark:bg-[#020617]">
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Detected Issue</p>
              <p className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{result.diseaseName}</p>
            </div>
            <div className="rounded-md bg-white/70 p-3 dark:bg-[#020617]">
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8]">Confidence</p>
              <p className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]">{result.confidence}%</p>
            </div>
          </div>
          <p className="mt-3 rounded-md bg-white/70 p-3 text-sm text-[#334155] dark:bg-[#020617] dark:text-[#DCFCE7]">
            <span className="font-semibold text-[#166534] dark:text-[#4ADE80]">Recommended Treatment: </span>
            {result.treatment}
          </p>
        </div>
      )}
    </article>
  );
}
