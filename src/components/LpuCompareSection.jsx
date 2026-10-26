import { CompareCollegesSection } from "./CompareCollegesSection";
import { DEGREEFYD_LPU_API } from "../data/apiData";

export const LpuCompareSection = ({
  onOpenBrochure,
  onOpenHelpDesk,
  sectionId = "compare-colleges",
}) => (
  <CompareCollegesSection
    sectionId={sectionId}
    title="Compare Top Online Universities"
    description="Choosing an online university can be tough. We're here to make it simple."
    logo={DEGREEFYD_LPU_API.hero.logoImage}
    name={DEGREEFYD_LPU_API.title}
    location={DEGREEFYD_LPU_API.location}
    tags={DEGREEFYD_LPU_API.approvals.slice(0, 4)}
    onOpenBrochure={onOpenBrochure}
    onOpenHelpDesk={onOpenHelpDesk}
  />
);
