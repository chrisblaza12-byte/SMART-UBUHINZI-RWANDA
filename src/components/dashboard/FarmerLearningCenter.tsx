import { CheckCircle2, Clock3, Download, GraduationCap, Leaf, LockKeyhole } from "lucide-react";
import { useEffect, useState } from "react";
import { learningCourses, rwandaCrops } from "../../data/homeData";
import { Language } from "../../lib/translations";

type FarmerLearningCenterProps = { userId: string; language: Language };

export function FarmerLearningCenter({ userId, language }: FarmerLearningCenterProps) {
  const storageKey = `learning-progress-v2-${userId}`;
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [modules, setModules] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
      setCompleted(saved.courses || {});
      setModules(saved.modules || {});
    } catch {
      setCompleted({});
    }
  }, [storageKey]);

  const completedCount = learningCourses.filter((course) => completed[course.title]).length;
  const nextCourseIndex = learningCourses.findIndex((course) => !completed[course.title]);
  const allComplete = completedCount === learningCourses.length;
  const completeModule = (courseTitle: string, moduleIndex: number) => {
    const key = `${courseTitle}-${moduleIndex}`;
    setModules((current) => {
      const next = { ...current, [key]: true };
      localStorage.setItem(storageKey, JSON.stringify({ courses: completed, modules: next }));
      return next;
    });
  };
  const completeCourse = (title: string, index: number) => {
    const course = learningCourses[index];
    const allModulesComplete = course.steps.every((_, moduleIndex) => modules[`${title}-${moduleIndex}`]);
    if (!allModulesComplete || index !== nextCourseIndex) return;
    setCompleted((current) => {
      const next = { ...current, [title]: true };
      localStorage.setItem(storageKey, JSON.stringify({ courses: next, modules }));
      return next;
    });
  };
  const isKinyarwanda = language === "rw";
  const text = isKinyarwanda
    ? { required: "Amasomo ategetswe ku bahinzi", heading: "Wige kurinda ibihingwa byose", intro: "Soma kandi urangize modules eshatu za buri somo. Iyo urangije isomo, ni bwo ufungura igice gikurikira.", completed: "Amasomo yarangiye", course: "Isomo", module: "Module", locked: "Banza urangize isomo ribanza", read: "Soma urangize module", moduleDone: "Module yarangiye", finish: "Emeza ko urangije isomo", done: "Isomo ryarangiye", certificate: "Icyemezo cy'amahugurwa", certificateText: "Warangije amasomo yose yo kurinda ibihingwa.", download: "Kuramo icyemezo", crops: "Ibihingwa bihingwa mu Rwanda", cropsText: "Koresha aya mazina igihe usoma amasomo cyangwa usuzuma igihingwa." }
    : { required: "Required farmer training", heading: "Learn how to protect every crop", intro: "Read and complete all three modules in each course. Finish the course before the next chapter unlocks.", completed: "Courses completed", course: "Course", module: "Module", locked: "Complete the previous course first", read: "Read and complete module", moduleDone: "Module completed", finish: "Mark course complete", done: "Course completed", certificate: "Farmer training certificate", certificateText: "You completed every course on protecting crops.", download: "Download certificate", crops: "Crops cultivated in Rwanda", cropsText: "Use these crop names when reviewing lessons or submitting a diagnosis." };

  return (
    <div className="space-y-4">
      <article className="rounded-[18px] bg-[#103b34] p-5 text-white shadow-[0_12px_22px_rgba(16,59,52,0.18)] 2xl:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a8e6d2]">{text.required}</p><h2 className="mt-2 text-2xl font-bold">{text.heading}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#d5f0ea]">{text.intro}</p></div>
          <div className="rounded-xl bg-white/10 px-4 py-3 text-center"><p className="text-2xl font-bold">{completedCount}/{learningCourses.length}</p><p className="text-[11px] uppercase tracking-[0.12em] text-[#bfe5db]">{text.completed}</p></div>
        </div>
      </article>

      <div className="grid gap-3 lg:grid-cols-2">
        {learningCourses.map((course, index) => {
          const isComplete = Boolean(completed[course.title]);
          const isUnlocked = index === 0 || Boolean(completed[learningCourses[index - 1].title]);
          const title = isKinyarwanda ? course.titleRw : course.title;
          const summary = isKinyarwanda ? course.summaryRw : course.summary;
          const steps = isKinyarwanda ? course.stepsRw : course.steps;
          const modulesComplete = steps.every((_, moduleIndex) => modules[`${course.title}-${moduleIndex}`]);
          return <article key={course.title} className={`rounded-[18px] border p-5 shadow-[0_8px_18px_rgba(17,34,27,0.04)] dark:border-[#1d5743] dark:bg-[#123b2f] ${isUnlocked ? "border-[#d7e8e2] bg-white" : "border-[#e2e8e5] bg-[#f5f8f7] opacity-75 dark:bg-[#0b261d]"}`}>
            <div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#dff4eb] text-[#18794e] dark:bg-[#1d5743] dark:text-[#86efac]">{isUnlocked ? <GraduationCap className="h-5 w-5" /> : <LockKeyhole className="h-5 w-5" />}</span><div className="min-w-0"><p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#18794e]">{text.course} {index + 1}</p><h3 className="font-bold">{title}</h3><p className="mt-1 flex items-center gap-1 text-xs text-[#6f817d]"><Clock3 className="h-3.5 w-3.5" /> {course.duration}</p></div></div>
            <p className="mt-4 text-sm leading-6 text-[#647a78] dark:text-[#b9d7cb]">{summary}</p>
            <div className="mt-3 space-y-2">{steps.map((step, stepIndex) => {
              const moduleKey = `${course.title}-${stepIndex}`;
              const moduleComplete = Boolean(modules[moduleKey]);
              return <div key={step} className="rounded-xl border border-[#e3ece8] bg-[#f8fbfa] p-3 dark:border-[#1d5743] dark:bg-[#0b261d]"><p className="text-xs leading-5 text-[#526b65] dark:text-[#c5e2d8]"><span className="mr-1 font-bold text-[#18794e]">{text.module} {stepIndex + 1}:</span>{step}</p><button type="button" disabled={!isUnlocked || moduleComplete || (stepIndex > 0 && !modules[`${course.title}-${stepIndex - 1}`])} onClick={() => completeModule(course.title, stepIndex)} className={`mt-2 inline-flex min-h-9 items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition disabled:cursor-not-allowed ${moduleComplete ? "bg-[#dcfce7] text-[#18794e]" : isUnlocked && (stepIndex === 0 || modules[`${course.title}-${stepIndex - 1}`]) ? "bg-[#dff4eb] text-[#18794e] hover:bg-[#c7eadc]" : "bg-[#e2ebe7] text-[#71817c]"}`}>{moduleComplete ? <CheckCircle2 className="h-3.5 w-3.5" /> : null}{moduleComplete ? text.moduleDone : !isUnlocked ? text.locked : text.read}</button></div>;
            })}</div>
            <button type="button" disabled={!isUnlocked || isComplete || !modulesComplete} onClick={() => completeCourse(course.title, index)} className={`mt-4 inline-flex min-h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition disabled:cursor-not-allowed ${isComplete ? "bg-[#dcfce7] text-[#18794e]" : isUnlocked && modulesComplete ? "bg-[#22c55e] text-[#052e16] hover:bg-[#4ade80]" : "bg-[#dce6e2] text-[#647a78]"}`}>
              {isComplete ? <CheckCircle2 className="h-4 w-4" /> : !isUnlocked ? <LockKeyhole className="h-4 w-4" /> : null}{isComplete ? text.done : isUnlocked && modulesComplete ? text.finish : text.read}
            </button>
          </article>;
        })}
      </div>

      {allComplete && <article className="rounded-[18px] border-2 border-[#d9ad4b] bg-[#fffaf0] p-6 text-center shadow-[0_12px_25px_rgba(121,86,17,0.12)] dark:border-[#967527] dark:bg-[#2a2412] 2xl:p-8">
        <GraduationCap className="mx-auto h-12 w-12 text-[#b7791f]" /><h2 className="mt-3 text-2xl font-bold text-[#785a1b] dark:text-[#f5df9c]">{text.certificate}</h2><p className="mt-2 text-sm text-[#8b7b58] dark:text-[#d8c895]">{text.certificateText}</p><p className="mt-2 font-semibold text-[#785a1b] dark:text-[#f5df9c]">{userId}</p><button type="button" onClick={() => window.print()} className="mt-5 inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-xl bg-[#b7791f] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#986515]"><Download className="h-4 w-4" />{text.download}</button>
      </article>}

      <article className="rounded-[18px] border border-[#d7e8e2] bg-white p-5 shadow-[0_8px_18px_rgba(17,34,27,0.04)] dark:border-[#1d5743] dark:bg-[#123b2f] 2xl:p-7">
        <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-[#eaf8f2] text-[#18794e] dark:bg-[#1d5743] dark:text-[#86efac]"><Leaf className="h-5 w-5" /></span><div><h2 className="text-xl font-bold">{text.crops}</h2><p className="text-sm text-[#6f817d]">{text.cropsText}</p></div></div>
        <div className="mt-5 flex flex-wrap gap-2">{rwandaCrops.map((crop) => <span key={crop} className="rounded-full border border-[#b9dfcf] bg-[#f5fbf8] px-3 py-1.5 text-xs font-semibold text-[#28664f] dark:border-[#28664f] dark:bg-[#0b261d] dark:text-[#b9d7cb]">{crop}</span>)}</div>
      </article>
    </div>
  );
}
