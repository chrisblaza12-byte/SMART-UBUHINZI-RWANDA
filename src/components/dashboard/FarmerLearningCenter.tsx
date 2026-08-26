import { CheckCircle2, Clock3, GraduationCap, Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import { learningCourses, rwandaCrops } from "../../data/homeData";

type FarmerLearningCenterProps = { userId: string };

export function FarmerLearningCenter({ userId }: FarmerLearningCenterProps) {
  const storageKey = `learning-progress-${userId}`;
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      setCompleted(JSON.parse(localStorage.getItem(storageKey) || "{}"));
    } catch {
      setCompleted({});
    }
  }, [storageKey]);

  const completedCount = learningCourses.filter((course) => completed[course.title]).length;
  const toggleCourse = (title: string) => {
    setCompleted((current) => {
      const next = { ...current, [title]: !current[title] };
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  return (
    <div className="space-y-4">
      <article className="rounded-[18px] bg-[#103b34] p-5 text-white shadow-[0_12px_22px_rgba(16,59,52,0.18)] 2xl:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a8e6d2]">Required farmer training</p><h2 className="mt-2 text-2xl font-bold">Learn how to protect every crop</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#d5f0ea]">Complete these practical courses to recognize crop problems, choose safer treatment steps, and protect your harvest.</p></div>
          <div className="rounded-xl bg-white/10 px-4 py-3 text-center"><p className="text-2xl font-bold">{completedCount}/{learningCourses.length}</p><p className="text-[11px] uppercase tracking-[0.12em] text-[#bfe5db]">Completed</p></div>
        </div>
      </article>

      <div className="grid gap-3 lg:grid-cols-2">
        {learningCourses.map((course) => {
          const isComplete = Boolean(completed[course.title]);
          return <article key={course.title} className="rounded-[18px] border border-[#d7e8e2] bg-white p-5 shadow-[0_8px_18px_rgba(17,34,27,0.04)] dark:border-[#1d5743] dark:bg-[#123b2f]">
            <div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#dff4eb] text-[#18794e] dark:bg-[#1d5743] dark:text-[#86efac]"><GraduationCap className="h-5 w-5" /></span><div className="min-w-0"><h3 className="font-bold">{course.title}</h3><p className="mt-1 flex items-center gap-1 text-xs text-[#6f817d]"><Clock3 className="h-3.5 w-3.5" /> {course.duration}</p></div></div>
            <p className="mt-4 text-sm leading-6 text-[#647a78] dark:text-[#b9d7cb]">{course.summary}</p>
            <ol className="mt-3 space-y-1.5 text-xs leading-5 text-[#526b65] dark:text-[#c5e2d8]">{course.steps.map((step, index) => <li key={step}><span className="mr-1 font-bold text-[#18794e]">{index + 1}.</span>{step}</li>)}</ol>
            <button type="button" onClick={() => toggleCourse(course.title)} className={`mt-4 inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${isComplete ? "bg-[#dcfce7] text-[#18794e] hover:bg-[#bbf7d0]" : "bg-[#22c55e] text-[#052e16] hover:bg-[#4ade80]"}`}>
              {isComplete && <CheckCircle2 className="h-4 w-4" />}{isComplete ? "Course completed" : "Mark course complete"}
            </button>
          </article>;
        })}
      </div>

      <article className="rounded-[18px] border border-[#d7e8e2] bg-white p-5 shadow-[0_8px_18px_rgba(17,34,27,0.04)] dark:border-[#1d5743] dark:bg-[#123b2f] 2xl:p-7">
        <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#eaf8f2] text-[#18794e] dark:bg-[#1d5743] dark:text-[#86efac]"><Leaf className="h-5 w-5" /></span><div><h2 className="text-xl font-bold">Crops cultivated in Rwanda</h2><p className="text-sm text-[#6f817d]">Use these crop names when reviewing lessons or submitting a diagnosis.</p></div></div>
        <div className="mt-5 flex flex-wrap gap-2">{rwandaCrops.map((crop) => <span key={crop} className="rounded-full border border-[#b9dfcf] bg-[#f5fbf8] px-3 py-1.5 text-xs font-semibold text-[#28664f] dark:border-[#28664f] dark:bg-[#0b261d] dark:text-[#b9d7cb]">{crop}</span>)}</div>
      </article>
    </div>
  );
}
