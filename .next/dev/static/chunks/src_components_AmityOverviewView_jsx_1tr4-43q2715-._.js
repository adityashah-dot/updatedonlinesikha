(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/AmityOverviewView.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AmityOverviewView",
    ()=>AmityOverviewView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$OB3PAWPO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-OB3PAWPO.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/quote.js [app-client] (ecmascript) <export default as Quote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$indian$2d$rupee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IndianRupee$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/indian-rupee.js [app-client] (ecmascript) <export default as IndianRupee>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TableOfContents$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/TableOfContents.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProgrammeCardsSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProgrammeCardsSection.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdmissionFlowSteps$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AdmissionFlowSteps.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BlogsListSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BlogsListSection.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CompareCollegesSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/CompareCollegesSection.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/universities/amityContent.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sectionTitles.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/universities/amity.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
;
;
const TOC_ITEMS = [
    {
        id: "latest-news",
        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Latest News & Updates")
    },
    {
        id: "highlights",
        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Highlights")
    },
    {
        id: "courses-fees",
        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Courses and Fees")
    },
    {
        id: "popular-programmes",
        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Popular Programmes")
    },
    {
        id: "eligibility-criteria",
        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Eligibility and Selection Criteria")
    },
    {
        id: "admission-process",
        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Admission Process")
    },
    {
        id: "admission-dates",
        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Admission Important Dates")
    },
    {
        id: "rankings",
        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Rankings and Accreditations")
    },
    {
        id: "examination-pattern",
        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Examination Pattern")
    },
    {
        id: "placements",
        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Placements")
    },
    {
        id: "scholarships",
        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Scholarships")
    },
    {
        id: "campus",
        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Campus")
    },
    {
        id: "sample-degree",
        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Sample Degree")
    },
    {
        id: "reviews-section",
        label: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Reviews & FAQs")
    },
    {
        id: "compare-colleges",
        label: "Compare Colleges with Amity Online"
    },
    {
        id: "blogs",
        label: "Blogs"
    }
];
const stripHtml = (html)=>html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const AMITY_PROGRAMME_CARDS = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_UNIVERSITY_DATA"].courses.map(_c = (c)=>({
        id: c.id,
        title: c.name,
        subtitle: `${c.level === "PG" ? "Postgraduate" : "Undergraduate"} Programme`,
        duration: c.duration.replace(/\s*\(.*\)/, ""),
        fee: c.totalFee,
        mode: "Online",
        specialisations: c.specializations
    }));
_c1 = AMITY_PROGRAMME_CARDS;
const CAMPUS_IMAGES = [
    {
        src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].gallery.image,
        alt: "Amity University Online Campus View"
    },
    {
        src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].gallery.image,
        alt: "Amity University Online Campus Aerial View"
    }
];
const AmityOverviewView = ({ universityNavigation, onOpenApply, onOpenBrochure, onOpenHelpDesk })=>{
    _s();
    const [activeSection, setActiveSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(TOC_ITEMS[0].id);
    const [openFaq, setOpenFaq] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AmityOverviewView.useEffect": ()=>{
            const handleScroll = {
                "AmityOverviewView.useEffect.handleScroll": ()=>{
                    const scrollPosition = window.scrollY + 160;
                    for(let i = TOC_ITEMS.length - 1; i >= 0; i--){
                        const el = document.getElementById(TOC_ITEMS[i].id);
                        if (el && el.offsetTop <= scrollPosition) {
                            setActiveSection(TOC_ITEMS[i].id);
                            break;
                        }
                    }
                }
            }["AmityOverviewView.useEffect.handleScroll"];
            window.addEventListener("scroll", handleScroll, {
                passive: true
            });
            return ({
                "AmityOverviewView.useEffect": ()=>window.removeEventListener("scroll", handleScroll)
            })["AmityOverviewView.useEffect"];
        }
    }["AmityOverviewView.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AmityOverviewView.useEffect": ()=>{
            const revealNodes = Array.from(document.querySelectorAll(".am-exam-reveal"));
            if (!revealNodes.length) return;
            if (!("IntersectionObserver" in window)) {
                revealNodes.forEach({
                    "AmityOverviewView.useEffect": (node)=>node.classList.add("show")
                }["AmityOverviewView.useEffect"]);
                return;
            }
            const observer = new IntersectionObserver({
                "AmityOverviewView.useEffect": (entries)=>{
                    entries.forEach({
                        "AmityOverviewView.useEffect": (entry, index)=>{
                            if (entry.isIntersecting) {
                                setTimeout({
                                    "AmityOverviewView.useEffect": ()=>{
                                        entry.target.classList.add("show");
                                    }
                                }["AmityOverviewView.useEffect"], index * 120);
                                observer.unobserve(entry.target);
                            }
                        }
                    }["AmityOverviewView.useEffect"]);
                }
            }["AmityOverviewView.useEffect"], {
                threshold: 0.2
            });
            revealNodes.forEach({
                "AmityOverviewView.useEffect": (node)=>observer.observe(node)
            }["AmityOverviewView.useEffect"]);
            return ({
                "AmityOverviewView.useEffect": ()=>observer.disconnect()
            })["AmityOverviewView.useEffect"];
        }
    }["AmityOverviewView.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#f0f3ff] border-b border-[#e7eeff]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "flex items-center text-xs text-[#43474d] space-x-2 font-medium",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$OB3PAWPO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                to: "/",
                                className: "hover:text-[#115eaf] cursor-pointer",
                                children: "Home"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                lineNumber: 110,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "w-3.5 h-3.5 text-[#74777e]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$OB3PAWPO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                                to: "/universities",
                                className: "hover:text-[#115eaf] cursor-pointer",
                                children: "Colleges"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                lineNumber: 114,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "w-3.5 h-3.5 text-[#74777e]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                lineNumber: 117,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hover:text-[#115eaf] cursor-pointer",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].title
                            }, void 0, false, {
                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "w-3.5 h-3.5 text-[#74777e]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[#000f22] font-bold",
                                children: "Overview"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                lineNumber: 120,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/AmityOverviewView.jsx",
                lineNumber: 107,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-white text-[#000f22] border-b border-[#e7eeff]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-row items-start gap-3 sm:gap-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].logoImage,
                                    alt: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName} Logo`,
                                    className: "w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl bg-white border border-[#e7eeff] p-1.5 shadow-sm shrink-0",
                                    onError: (e)=>{
                                        e.target.style.display = "none";
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "section-title text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight font-sans text-[#000f22]",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-2 mt-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold",
                                                    children: [
                                                        "#",
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].nirfRanking,
                                                        " NIRF Rank"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 144,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].naacGrade
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 147,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold",
                                                    children: "UGC-DEB Entitled"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 150,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold",
                                                    children: "100% Online"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 153,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 143,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-start mt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "order-2 lg:order-none lg:col-span-7 space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "section-description text-xs sm:text-sm text-[#43474d] font-normal flex items-center gap-1.5 flex-wrap",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                    className: "w-3.5 h-3.5 text-[#115eaf] shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 163,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].location,
                                                " · ",
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].type,
                                                " · Est. ",
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].established,
                                                " ·",
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex items-center gap-0.5 font-bold text-[#B45309]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                            className: "w-3 h-3 fill-[#D97706] text-[#D97706]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 166,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].rating
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 165,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 162,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-[#2d3137] leading-relaxed font-normal",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].heroDescription
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 170,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "order-1 lg:order-none lg:col-span-5 lg:mr-[50px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl overflow-hidden border border-[#e7eeff] shadow-xs bg-[#f9f9ff]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].heroImage,
                                            alt: "Amity University Online Campus",
                                            className: "w-full h-48 sm:h-60 lg:h-64 object-cover",
                                            loading: "lazy"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 177,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                        lineNumber: 176,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 175,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 160,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-stretch gap-3 mt-5 lg:mr-[100px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block text-sm font-bold text-[#000f22] font-sans",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].quickStats.feeRange
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 189,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-[#74777e]",
                                            children: "Fee Range"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 192,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 188,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block text-sm font-bold text-[#115eaf] font-sans",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].quickStats.duration
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 195,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-[#74777e]",
                                            children: "Duration"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 198,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 194,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block text-sm font-bold text-[#000f22] font-sans",
                                            children: "Online"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 201,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-[#74777e]",
                                            children: "Semester-based"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 202,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 200,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block text-sm font-bold text-[#B45309] font-sans",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].quickStats.placementRate
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 205,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-[#74777e]",
                                            children: "Placement Rate"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 208,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 204,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3 md:ml-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>onOpenBrochure(),
                                            className: "px-5 py-2.5 rounded-xl bg-white text-[#115eaf] border border-[#115eaf] text-xs sm:text-sm font-bold hover:bg-[#f0f3ff] active:scale-95 transition-all flex items-center justify-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 215,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Brochure"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 211,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>onOpenApply(),
                                            className: "px-6 py-2.5 rounded-xl bg-[#115eaf] text-white text-xs sm:text-sm font-bold shadow hover:bg-[#004689] active:scale-95 transition-all flex items-center justify-center gap-2",
                                            children: [
                                                "Apply Now",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 223,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 218,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 187,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                    lineNumber: 129,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/AmityOverviewView.jsx",
                lineNumber: 128,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            universityNavigation,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "content-block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-10",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "section-container",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TableOfContents$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableOfContents"], {
                            title: "Table of contents",
                            items: TOC_ITEMS,
                            activeId: activeSection,
                            onItemClick: (id)=>setActiveSection(id),
                            defaultExpanded: false,
                            collapsedCount: 7
                        }, void 0, false, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 240,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "latest-news",
                            className: "page-section card bg-[#f0f3ff] rounded-2xl border border-[#d5e3ff] scroll-mt-[130px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "section-title text-lg sm:text-xl font-bold text-[#000f22] font-sans",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Latest News and Updates")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 256,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "section-description text-sm text-[#2d3137] leading-relaxed font-normal",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].latestNews.description
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 259,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "mt-3 space-y-2.5",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].latestNews.bullets.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-2.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                    className: "w-4 h-4 text-[#115eaf] shrink-0 mt-0.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 264,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-[#2d3137] leading-relaxed font-normal",
                                                    children: b
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 265,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, b, true, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 263,
                                            columnNumber: 52
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 262,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-[#74777e] font-normal mt-3",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].latestNews.date
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 268,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 252,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "highlights",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between flex-wrap gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans",
                                            children: "Amity University Online Highlights 2026"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 281,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>onOpenBrochure(),
                                            className: "px-4 py-2 bg-white text-[#115eaf] border border-[#115eaf] rounded-xl text-xs font-bold hover:bg-[#f0f3ff] transition-all flex items-center gap-1.5 shadow-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                    className: "w-3.5 h-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 288,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Download Brochure"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 289,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 284,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 280,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "section-description mt-[18px] text-sm font-normal text-[#2d3137] leading-relaxed",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].highlightsIntro
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 292,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full text-left border-collapse text-xs sm:text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "bg-[#0b2540] text-white",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Particulars"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 299,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Details"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 300,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 298,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 297,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "divide-y divide-[#e7eeff]",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].highlightsTable.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "hover:bg-[#f0f3ff]/60 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-normal text-[#000f22]",
                                                                children: row.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 305,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-normal text-[#2d3137]",
                                                                children: row.value
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 306,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, row.label, true, {
                                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                        lineNumber: 304,
                                                        columnNumber: 55
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 303,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                        lineNumber: 296,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 295,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-5 rounded-2xl bg-[#f0f3ff] border border-[#d5e3ff] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-[#2d3137] leading-relaxed",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].insightsBannerText
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 313,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-2.5",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: onOpenHelpDesk,
                                                className: "px-5 py-2.5 bg-[#115eaf] text-white rounded-xl text-xs font-bold hover:bg-[#004689] transition-all flex items-center gap-1.5 shadow-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                        lineNumber: 321,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Talk to Expert"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 317,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 316,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 312,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 276,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "courses-fees",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "section-title text-2xl font-bold text-[#000f22] font-sans",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Courses and Fees")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 335,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "section-description text-sm text-[#43474d] leading-relaxed font-normal",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].coursesIntro
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 338,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-1.5 mt-3",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].paymentOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-2 py-1 rounded-[7px] bg-white border border-[#d5e3ff] text-[11px] font-normal text-[#43474d]",
                                            children: opt
                                        }, opt, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 342,
                                            columnNumber: 50
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 341,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-[#43474d] leading-relaxed font-normal mt-3",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].coursesOutro
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 349,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full text-left border-collapse text-xs sm:text-sm min-w-[640px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "bg-[#0b2540] text-white",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Course"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 356,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Duration"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 357,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Semester Fee"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 358,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Total Fee"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 359,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Eligibility"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 360,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 355,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 354,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "divide-y divide-[#e7eeff]",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_UNIVERSITY_DATA"].courses.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "hover:bg-[#f0f3ff]/60 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-semibold text-[#000f22]",
                                                                children: c.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 365,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-normal text-[#2d3137]",
                                                                children: c.duration
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 366,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-normal text-[#2d3137]",
                                                                children: c.feePerSemester
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 367,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-semibold text-[#115eaf]",
                                                                children: c.totalFee
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 368,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-normal text-[#2d3137] max-w-[220px]",
                                                                children: c.eligibility
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 369,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, c.id, true, {
                                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                        lineNumber: 364,
                                                        columnNumber: 61
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 363,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                        lineNumber: 353,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 352,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-5 rounded-2xl bg-[#f0f3ff] border border-[#d5e3ff] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-[18px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-[#2d3137] leading-relaxed",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].coursesPage.coursesFees.bannerText
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 377,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-2.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: onOpenHelpDesk,
                                                    className: "px-4 py-2.5 bg-white text-[#115eaf] border border-[#115eaf] rounded-xl text-xs font-bold hover:bg-[#f0f3ff] transition-all flex items-center gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$indian$2d$rupee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IndianRupee$3e$__["IndianRupee"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 385,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "View Fee Structure"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 381,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onOpenApply(),
                                                    className: "px-5 py-2.5 bg-[#115eaf] text-white rounded-xl text-xs font-bold hover:bg-[#004689] transition-all flex items-center gap-1.5 shadow-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 392,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "Apply Now"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 388,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 380,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 376,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 331,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProgrammeCardsSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProgrammeCardsSection"], {
                            sectionId: "popular-programmes",
                            title: "Amity Online Popular Programmes",
                            description: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].popularProgrammesIntro,
                            programmes: AMITY_PROGRAMME_CARDS,
                            onOpenBrochure: ()=>onOpenBrochure(),
                            onOpenApply: ()=>onOpenApply()
                        }, void 0, false, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 402,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "eligibility-criteria",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Eligibility and Selection Criteria")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 418,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "section-description text-sm text-[#2d3137] leading-relaxed font-normal",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].eligibility.intro
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 421,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full text-left border-collapse text-xs sm:text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "bg-[#0b2540] text-white",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Course"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 428,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Eligibility"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 429,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 427,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 426,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "divide-y divide-[#e7eeff]",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].eligibility.rows.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "hover:bg-[#f0f3ff]/60 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-semibold text-[#000f22]",
                                                                children: row.course
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 434,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-normal text-[#2d3137]",
                                                                children: row.eligibility
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 435,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, row.course, true, {
                                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                        lineNumber: 433,
                                                        columnNumber: 56
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 432,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                        lineNumber: 425,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 424,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 414,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "admission-process",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Admission Process")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 449,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "section-description text-sm text-[#2d3137] leading-relaxed font-normal",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].admission.intro
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 452,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-[#000f22] mt-4",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].admission.stepsHeading
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 455,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdmissionFlowSteps$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdmissionFlowSteps"], {
                                    steps: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].admission.steps
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 458,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-base font-semibold text-[#000f22] mt-5",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].admission.docsHeading
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 459,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "mt-3 space-y-2.5",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].admission.requiredDocuments.map((doc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-2.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                    className: "w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 464,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-[#2d3137] leading-relaxed font-normal",
                                                    children: doc
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 465,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, doc, true, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 463,
                                            columnNumber: 63
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 462,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 445,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "admission-dates",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between flex-wrap gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Admission Important Dates")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 478,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 482,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Intake 2026 Active"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 481,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 477,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "section-description text-sm text-[#2d3137] leading-relaxed font-normal",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].admissionDates.intro
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 486,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full text-left border-collapse text-xs sm:text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "bg-[#0b2540] text-white",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Event"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 493,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Important Date"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 494,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 492,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 491,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "divide-y divide-[#e7eeff]",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].admissionDates.table.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "hover:bg-[#f0f3ff]/60 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-semibold text-[#000f22]",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "inline-flex items-center gap-1.5",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                            className: "w-3.5 h-3.5 text-[#115eaf] shrink-0"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                            lineNumber: 501,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        row.event
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                    lineNumber: 500,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 499,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-normal text-[#2d3137]",
                                                                children: row.date
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 505,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, row.event, true, {
                                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                        lineNumber: 498,
                                                        columnNumber: 60
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 497,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                        lineNumber: 490,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 489,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-[#74777e] font-normal mt-3",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].admissionDates.note
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 510,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 473,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "rankings",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Rankings and Accreditations")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 522,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "section-description text-sm text-[#2d3137] leading-relaxed font-normal",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].rankings.intro
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 525,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full text-left border-collapse text-xs sm:text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "bg-[#0b2540] text-white",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Authority"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 532,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Category"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 533,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Status"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 534,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 531,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 530,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "divide-y divide-[#e7eeff]",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].rankings.table.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "hover:bg-[#f0f3ff]/60 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-semibold text-[#000f22]",
                                                                children: row.authority
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 539,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-normal text-[#2d3137]",
                                                                children: row.category
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 540,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-normal text-[#115eaf]",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "inline-flex items-center gap-1.5",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                                                            className: "w-3.5 h-3.5 text-amber-600 shrink-0"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                            lineNumber: 543,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        row.status
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                    lineNumber: 542,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 541,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, row.authority, true, {
                                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                        lineNumber: 538,
                                                        columnNumber: 54
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 537,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                        lineNumber: 529,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 528,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-5 rounded-2xl bg-[#f0f3ff] border border-[#d5e3ff] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-[18px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-[#2d3137] leading-relaxed",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].rankings.bannerText
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 552,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onOpenHelpDesk,
                                            className: "px-5 py-2.5 bg-[#115eaf] text-white rounded-xl text-xs font-bold hover:bg-[#004689] transition-all flex items-center gap-1.5 shadow-sm",
                                            children: [
                                                "Connect Now",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "w-3.5 h-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 560,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 555,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 551,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 518,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "examination-pattern",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Examination Pattern")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 572,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "section-description text-sm text-[#2d3137] leading-relaxed font-normal",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].examinations.intro
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 575,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                    children: `
              .am-exam-step {
                --am-exam-badge-w: 78px;
                position: relative;
                display: grid;
                grid-template-columns: calc(var(--am-exam-badge-w) + 18px) minmax(0, 1fr);
                padding-bottom: 30px;
              }
              .am-exam-step:last-child {
                padding-bottom: 0;
              }
              .am-exam-step:not(:last-child)::before {
                content: "";
                position: absolute;
                left: calc(var(--am-exam-badge-w) / 2 - 5px);
                top: 40px;
                bottom: 6px;
                width: 3px;
                background: repeating-linear-gradient(180deg, #0b2540 0 4px, transparent 4px 9px);
                animation: am-exam-flow-down 0.9s linear infinite;
              }
              @keyframes am-exam-flow-down {
                from { background-position: 0 0; }
                to { background-position: 0 9px; }
              }
              .am-exam-badge {
                width: var(--am-exam-badge-w);
                height: 34px;
                display: grid;
                place-items: center;
                background: #0b2540;
                color: #fff;
                font-size: 13px;
                font-weight: 600;
                clip-path: polygon(0 0, 84% 0, 100% 50%, 84% 100%, 0 100%);
              }
              .am-exam-badge span {
                padding-right: 6px;
              }
              .am-exam-body h3 {
                margin: 2px 0 3px;
                font-size: 18px;
                font-weight: 600;
                line-height: 1.35;
                color: #000f22;
              }
              .am-exam-body p {
                margin: 0;
                font-size: 15px;
                line-height: 1.55;
                color: #43474d;
              }
              .am-exam-reveal {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
              }
              .am-exam-reveal.show {
                opacity: 1;
                transform: none;
              }
              @media (max-width: 640px) {
                .am-exam-step {
                  --am-exam-badge-w: 66px;
                }
                .am-exam-badge {
                  font-size: 12px;
                }
                .am-exam-body h3 {
                  font-size: 16px;
                }
                .am-exam-body p {
                  font-size: 14px;
                }
              }
              @media (prefers-reduced-motion: reduce) {
                .am-exam-step::before,
                .am-exam-reveal {
                  animation: none !important;
                  transition: none !important;
                  opacity: 1 !important;
                  transform: none !important;
                }
              }
            `
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 578,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-[18px]",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].examinations.steps.map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "am-exam-step am-exam-reveal",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "am-exam-badge",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "Step ",
                                                                String(index + 1).padStart(2, "0")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 667,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                        lineNumber: 666,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 665,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "am-exam-body",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            children: step.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 671,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: step.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 672,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 670,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, step.title, true, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 664,
                                            columnNumber: 62
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 663,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 568,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "placements",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Placements")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 682,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "section-description text-sm text-[#2d3137] leading-relaxed font-normal",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].placements.intro
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 685,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full text-left border-collapse text-xs sm:text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "bg-[#0b2540] text-white",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Placement Support"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 692,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Details"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 693,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 691,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 690,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "divide-y divide-[#e7eeff]",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].placements.table.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "hover:bg-[#f0f3ff]/60 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-semibold text-[#000f22]",
                                                                children: row.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 698,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-normal text-[#2d3137]",
                                                                children: row.value
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 699,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, row.label, true, {
                                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                        lineNumber: 697,
                                                        columnNumber: 56
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 696,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                        lineNumber: 689,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 688,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 md:grid-cols-4 gap-3 mt-[18px]",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].placements.stats.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 bg-[#f9f9ff] border border-[#e7eeff] rounded-xl text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-lg font-bold text-[#115eaf] font-sans tabular-nums",
                                                    children: s.value
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 709,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-[10px] text-[#74777e] font-normal mt-0.5",
                                                    children: s.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 712,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, s.label, true, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 705,
                                            columnNumber: 50
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 704,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-base font-semibold text-[#000f22] mt-5",
                                    children: "Top Recruiters"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 717,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative overflow-hidden mt-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-4 animate-[marquee_24s_linear_infinite] hover:[animation-play-state:paused]",
                                        children: [
                                            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_UNIVERSITY_DATA"].placements.recruiters,
                                            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_UNIVERSITY_DATA"].placements.recruiters
                                        ].map((r, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-20 min-w-[125px] px-3.5 shrink-0 bg-white border border-[#e7eeff] rounded-xl p-3 flex flex-col items-center justify-center gap-1 shadow-xs",
                                                children: [
                                                    r.logoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: r.logoUrl,
                                                        alt: r.name,
                                                        className: "max-h-7 max-w-[80px] object-contain",
                                                        loading: "lazy"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                        lineNumber: 727,
                                                        columnNumber: 34
                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-bold text-[#000f22]",
                                                        children: r.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                        lineNumber: 732,
                                                        columnNumber: 8
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-medium text-[#43474d] text-center truncate max-w-full",
                                                        children: r.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                        lineNumber: 733,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, `${r.name}-${idx}`, true, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 723,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                        lineNumber: 719,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 718,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 678,
                            columnNumber: 1
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "scholarships",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Scholarships")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 748,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "section-description text-sm text-[#2d3137] leading-relaxed font-normal",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].scholarships.intro
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 751,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full text-left border-collapse text-xs sm:text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "bg-[#0b2540] text-white",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Scholarship Type"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 758,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Benefit"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 759,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Eligible For"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 760,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 757,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 756,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "divide-y divide-[#e7eeff]",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].scholarships.table.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "hover:bg-[#f0f3ff]/60 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-semibold text-[#000f22]",
                                                                children: row.type
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 765,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-normal text-[#115eaf]",
                                                                children: row.benefit
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 766,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-2.5 px-4 font-normal text-[#2d3137]",
                                                                children: row.who
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 767,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, row.type, true, {
                                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                        lineNumber: 764,
                                                        columnNumber: 58
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 763,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                        lineNumber: 755,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 754,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "mt-3 space-y-2",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].scholarships.notes.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-start gap-2 text-xs text-[#43474d]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[#115eaf] mt-0.5",
                                                    children: "•"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 774,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                n
                                            ]
                                        }, n, true, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 773,
                                            columnNumber: 52
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 772,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 744,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "campus",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Campus")
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 788,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "section-description text-xs sm:text-sm text-[#43474d] leading-relaxed font-normal",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].gallery.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 791,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 787,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full text-left border-collapse text-xs sm:text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "bg-[#0b2540] text-white",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Mode"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 800,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "How to Reach"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 801,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 799,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 798,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "divide-y divide-[#e7eeff]",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].gallery.travel.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "hover:bg-[#f0f3ff]/60 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-3.5 px-4 font-normal text-[#000f22] align-top whitespace-nowrap",
                                                                children: row.mode
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 806,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-3.5 px-4 text-[#43474d] leading-relaxed font-normal",
                                                                children: row.detail
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                lineNumber: 809,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, row.mode, true, {
                                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                        lineNumber: 805,
                                                        columnNumber: 54
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 804,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                        lineNumber: 797,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 796,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                    children: `
              .amity-campus-marquee {
                overflow: hidden;
                position: relative;
                border-radius: 18px;
                border: 1px solid #e7eeff;
                background: #f0f3ff;
                margin-top: 18px;
                padding: 10px;
              }
              .amity-campus-marquee-track {
                display: flex;
                align-items: stretch;
                gap: 14px;
                width: max-content;
                padding-right: 10px;
                animation: amity-campus-marquee 24s linear infinite;
              }
              .amity-campus-marquee-track:hover {
                animation-play-state: paused;
              }
              .amity-campus-marquee-item {
                flex: 0 0 auto;
                width: min(320px, 72vw);
                background: #ffffff;
                overflow: hidden;
                border: 1px solid #e7eeff;
                border-radius: 18px;
                box-shadow: 0 10px 24px rgba(18, 37, 71, 0.08);
              }
              .amity-campus-marquee-item img {
                display: block;
                width: 100%;
                height: 220px;
                object-fit: cover;
                border-radius: 18px 18px 0 0;
              }
              .amity-campus-marquee-item figcaption {
                padding: 10px 12px;
                font-size: 11px;
                color: #43474d;
                background: white;
                border-top: 1px solid #e7eeff;
                border-radius: 0 0 18px 18px;
              }
              @keyframes amity-campus-marquee {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              @media (max-width: 640px) {
                .amity-campus-marquee { padding: 8px; }
                .amity-campus-marquee-track { gap: 10px; }
                .amity-campus-marquee-item { width: min(280px, 80vw); }
                .amity-campus-marquee-item img { height: 180px; }
              }
            `
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 817,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "amity-campus-marquee",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "amity-campus-marquee-track",
                                        children: [
                                            ...CAMPUS_IMAGES,
                                            ...CAMPUS_IMAGES
                                        ].map((image, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
                                                className: "amity-campus-marquee-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: image.src,
                                                        alt: image.alt,
                                                        loading: "lazy"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                        lineNumber: 877,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                                                        children: image.alt
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                        lineNumber: 878,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, `${image.src}-${index}`, true, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 876,
                                                columnNumber: 77
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AmityOverviewView.jsx",
                                        lineNumber: 875,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 874,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2 pt-1 mt-[18px]",
                                    children: [
                                        "Noida Campus",
                                        "Digital Learning",
                                        "LMS Access",
                                        "Student Support"
                                    ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-3 py-1.5 rounded-lg bg-[#f0f3ff] border border-[#d5e3ff] text-[11px] font-normal text-[#115eaf]",
                                            children: item
                                        }, item, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 884,
                                            columnNumber: 100
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 883,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-[#74777e] font-normal mt-3",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].gallery.note
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 891,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 783,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "sample-degree",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Sample Degree")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 906,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "block w-12 h-[4px] rounded-[4px] bg-[#115eaf] mt-1"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 909,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 sm:gap-5 items-center mt-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0 space-y-2.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[13px] text-[#2d3137] leading-relaxed font-normal",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].sampleDegree.description
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 912,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                            className: "w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 916,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[12px] text-[#2d3137] font-normal leading-relaxed",
                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].sampleDegree.badge
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 917,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 915,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                            className: "w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 922,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[12px] text-[#2d3137] font-normal leading-relaxed",
                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].sampleDegree.badge2
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 923,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 921,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onOpenBrochure(),
                                                    className: "mt-1 px-4 py-2 rounded-xl bg-[#115eaf] text-white text-[11px] font-bold hover:bg-[#004689] active:scale-95 transition-all inline-flex items-center gap-1.5 shadow-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 931,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "Download Sample Degree Info"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 927,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 911,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "rounded-xl overflow-hidden border border-[#e7eeff] shadow-xs bg-white w-full sm:w-56 lg:w-64 shrink-0 justify-self-center sm:justify-self-end",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].sampleDegreeImage,
                                                alt: "Amity Online Sample Degree Certificate",
                                                className: "w-full object-contain",
                                                loading: "lazy"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                lineNumber: 936,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 935,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 910,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 902,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "reviews-section",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs scroll-mt-[130px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sectionTitles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["sectionTitle"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].shortName, "Reviews")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 953,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-3 gap-4 mt-[18px]",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].testimonials.items.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] flex flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__["Quote"], {
                                                    className: "w-5 h-5 text-[#115eaf]/40 mb-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 961,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-[#2d3137] font-normal leading-relaxed flex-1",
                                                    children: stripHtml(t.text)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 962,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between mt-3 pt-2.5 border-t border-[#e7eeff]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-semibold text-[#000f22]",
                                                                    children: t.studentName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                    lineNumber: 967,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-[11px] text-[#74777e] font-normal",
                                                                    children: t.profession
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                    lineNumber: 968,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 966,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-0.5",
                                                            children: Array.from({
                                                                length: 5
                                                            }).map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                    className: `w-3 h-3 ${i < t.rating ? "fill-[#D97706] text-[#D97706]" : "text-[#c4c6ce]"}`
                                                                }, i, false, {
                                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                                    lineNumber: 971,
                                                                    columnNumber: 64
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 970,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 965,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, t.studentName, true, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 957,
                                            columnNumber: 52
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 956,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-bold text-[#000f22] font-sans mt-6",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].faqHeading
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 980,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3 mt-3",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].faqs.map((faq, idx)=>{
                                        const isOpen = openFaq === idx;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border border-[#e7eeff] rounded-xl overflow-hidden bg-white",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setOpenFaq(isOpen ? null : idx),
                                                    className: "w-full px-4 py-3.5 text-left flex items-center justify-between gap-3 hover:bg-[#f0f3ff]/50 transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm font-semibold text-[#000f22]",
                                                            children: faq.question
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 995,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: `text-[#115eaf] text-lg leading-none shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`,
                                                            children: "+"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                            lineNumber: 996,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 990,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "px-4 pb-4 text-xs sm:text-sm text-[#43474d] font-normal leading-relaxed border-t border-[#e7eeff] pt-3",
                                                    children: faq.answer
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                                    lineNumber: 1002,
                                                    columnNumber: 32
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, idx, true, {
                                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                                            lineNumber: 986,
                                            columnNumber: 12
                                        }, ("TURBOPACK compile-time value", void 0));
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                                    lineNumber: 983,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 949,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$CompareCollegesSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CompareCollegesSection"], {
                            title: "Compare Colleges with Amity Online",
                            description: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].compareIntro,
                            logo: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].logoImage,
                            name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].title,
                            location: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].location,
                            tags: [
                                "UGC-DEB Entitled",
                                "NAAC A+",
                                `NIRF #${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$universities$2f$amityContent$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AMITY_PAGE_CONTENT"].nirfRanking}`,
                                "100% Online"
                            ],
                            onOpenBrochure: ()=>onOpenBrochure(),
                            onOpenHelpDesk: onOpenHelpDesk
                        }, void 0, false, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 1013,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BlogsListSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogsListSection"], {
                            onOpenHelpDesk: onOpenHelpDesk,
                            sectionId: "blogs",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AmityOverviewView.jsx",
                            lineNumber: 1027,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AmityOverviewView.jsx",
                    lineNumber: 236,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/AmityOverviewView.jsx",
                lineNumber: 235,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AmityOverviewView.jsx",
        lineNumber: 103,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AmityOverviewView, "iIUutYU594VS5EYHb6P+kScG4R8=");
_c2 = AmityOverviewView;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "AMITY_PROGRAMME_CARDS$AMITY_UNIVERSITY_DATA.courses.map");
__turbopack_context__.k.register(_c1, "AMITY_PROGRAMME_CARDS");
__turbopack_context__.k.register(_c2, "AmityOverviewView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_AmityOverviewView_jsx_1tr4-43q2715-._.js.map