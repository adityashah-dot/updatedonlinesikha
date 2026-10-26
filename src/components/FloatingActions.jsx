import { PhoneCall } from "lucide-react";
export const FloatingActions = ({
  onOpenCounselorModal
}) => {
  return <aside
    aria-label="Quick counselor assistance"
    className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex items-center"
  >
      {
    /* Redesigned Counselor Help Floating Button */
  }
      <button
    type="button"
    onClick={onOpenCounselorModal}
    className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d5e3ff] bg-white text-[#000f22] shadow-lg shadow-slate-900/10 transition-all duration-200 hover:border-[#115eaf] hover:bg-[#f8faff] hover:shadow-xl active:scale-95 group font-sans cursor-pointer"
    aria-label="Counselor Help — request a free callback"
    title="Free Academic Counselor Help"
  >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#115eaf] text-white shadow-xs transition-transform group-hover:scale-105">
          <PhoneCall className="h-4 w-4 text-white" />
        </div>
      </button>
    </aside>;
};
