(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/OverviewView.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OverviewView",
    ()=>OverviewView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$coursesData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/coursesData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/apiData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProgrammeCardsSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProgrammeCardsSection.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BlogsListSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BlogsListSection.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneCall$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone-call.js [app-client] (ecmascript) <export default as PhoneCall>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-check.js [app-client] (ecmascript) <export default as UserCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$TableOfContents$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/TableOfContents.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
const RECRUITER_LOGOS = [
    {
        name: "Amazon",
        src: "/logos/amazon.jpg"
    },
    {
        name: "Cognizant",
        src: "/logos/cognizant.jpg"
    },
    {
        name: "TCS",
        src: "/logos/tcs.jpg"
    },
    {
        name: "Infosys",
        src: "/logos/infosys.png"
    },
    {
        name: "Wipro",
        src: "/logos/wipro.jpg"
    },
    {
        name: "Tech Mahindra",
        src: "/logos/techmahindra.jpg"
    },
    {
        name: "Capgemini",
        src: "/logos/capgemini.png"
    },
    {
        name: "Deloitte",
        src: "/logos/deloitte.jpg"
    },
    {
        name: "Times Internet",
        src: "/logos/timesinternet.jpg"
    }
];
const CAMPUS_IMAGES = [
    {
        src: "/images/campusviewlpu.jpeg",
        alt: "Lovely Professional University campus view"
    },
    {
        src: "/images/campusarealpu.jpeg",
        alt: "Lovely Professional University campus aerial view"
    },
    {
        src: "/images/campusviewlpu.jpeg",
        alt: "Lovely Professional University campus view"
    },
    {
        src: "/images/campusarealpu.jpeg",
        alt: "Lovely Professional University campus aerial view"
    }
];
const RecruiterScroll = ()=>{
    const doubled = [
        ...RECRUITER_LOGOS,
        ...RECRUITER_LOGOS
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative overflow-hidden",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-6 animate-[marquee_24s_linear_infinite] hover:[animation-play-state:paused]",
            children: doubled.map((r, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center h-16 min-w-[125px] px-3.5 bg-[#f9f9ff] border border-[#e7eeff] rounded-lg shrink-0",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: r.src,
                        alt: r.name,
                        className: "max-h-[34px] max-w-[100px] object-contain"
                    }, void 0, false, {
                        fileName: "[project]/src/components/OverviewView.jsx",
                        lineNumber: 59,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, `${r.name}-${i}`, false, {
                    fileName: "[project]/src/components/OverviewView.jsx",
                    lineNumber: 55,
                    columnNumber: 32
                }, ("TURBOPACK compile-time value", void 0)))
        }, void 0, false, {
            fileName: "[project]/src/components/OverviewView.jsx",
            lineNumber: 54,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/OverviewView.jsx",
        lineNumber: 53,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c = RecruiterScroll;
const OverviewView = ({ onSelectCourse, onOpenApply, onOpenBrochure, onOpenHelpDesk, universityNavigation })=>{
    _s();
    const [counselingForm, setCounselingForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        phone: "",
        email: "",
        course: "mba",
        state: "",
        city: ""
    });
    const [formSubmitted, setFormSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [formErrors, setFormErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [counselPanelOpen, setCounselPanelOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [openFaqIndex, setOpenFaqIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [activeSection, setActiveSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("latest-news");
    const [selectedHighlightCategory, setSelectedHighlightCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [selectedReviewCategory, setSelectedReviewCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All");
    const [tocOpen, setTocOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [highlightsExpanded, setHighlightsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [courseFeeSearch, setCourseFeeSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [blogIndex, setBlogIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [blogVisible, setBlogVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(3);
    const [openAdmissionStep, setOpenAdmissionStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [visibleAdmissionSteps, setVisibleAdmissionSteps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [examStep, setExamStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const ADMISSION_FLOW_STEPS = [
        {
            title: "Online Registration",
            description: "Visit the Lovely Professional University Online official portal and register using personal details such as name, email ID and mobile number. Login credentials are generated after successful registration."
        },
        {
            title: "Application Form Submission",
            description: "Fill out the online application form by selecting the desired programme and entering personal and academic details."
        },
        {
            title: "Document Upload",
            description: "Upload scanned copies of academic documents, identity proof, and photographs as part of the application process."
        },
        {
            title: "Eligibility Verification",
            description: "The university verifies eligibility based on academic qualifications and programme guidelines."
        },
        {
            title: "Fee Payment and Admission Confirmation",
            description: "Admission is confirmed after fee payment. Roll number and LMS login are issued to the student."
        }
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OverviewView.useEffect": ()=>{
            const stepNodes = Array.from(document.querySelectorAll(".admission-flow-step"));
            if (!stepNodes.length) return;
            if (!("IntersectionObserver" in window)) {
                setVisibleAdmissionSteps(stepNodes.map({
                    "OverviewView.useEffect": (_, index)=>index
                }["OverviewView.useEffect"]));
                return;
            }
            const observer = new IntersectionObserver({
                "OverviewView.useEffect": (entries)=>{
                    entries.forEach({
                        "OverviewView.useEffect": (entry)=>{
                            const index = Number(entry.target.dataset.stepIndex ?? 0);
                            if (entry.isIntersecting) {
                                setTimeout({
                                    "OverviewView.useEffect": ()=>{
                                        setVisibleAdmissionSteps({
                                            "OverviewView.useEffect": (prev)=>prev.includes(index) ? prev : [
                                                    ...prev,
                                                    index
                                                ]
                                        }["OverviewView.useEffect"]);
                                    }
                                }["OverviewView.useEffect"], index * 150);
                            }
                        }
                    }["OverviewView.useEffect"]);
                }
            }["OverviewView.useEffect"], {
                threshold: 0.35
            });
            stepNodes.forEach({
                "OverviewView.useEffect": (node)=>observer.observe(node)
            }["OverviewView.useEffect"]);
            return ({
                "OverviewView.useEffect": ()=>observer.disconnect()
            })["OverviewView.useEffect"];
        }
    }["OverviewView.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OverviewView.useEffect": ()=>{
            const revealNodes = Array.from(document.querySelectorAll(".exam-step-reveal"));
            if (!revealNodes.length) return;
            if (!("IntersectionObserver" in window)) {
                revealNodes.forEach({
                    "OverviewView.useEffect": (node)=>node.classList.add("show")
                }["OverviewView.useEffect"]);
                return;
            }
            const observer = new IntersectionObserver({
                "OverviewView.useEffect": (entries)=>{
                    entries.forEach({
                        "OverviewView.useEffect": (entry, index)=>{
                            if (entry.isIntersecting) {
                                setTimeout({
                                    "OverviewView.useEffect": ()=>{
                                        entry.target.classList.add("show");
                                    }
                                }["OverviewView.useEffect"], index * 120);
                                observer.unobserve(entry.target);
                            }
                        }
                    }["OverviewView.useEffect"]);
                }
            }["OverviewView.useEffect"], {
                threshold: 0.2
            });
            revealNodes.forEach({
                "OverviewView.useEffect": (node)=>observer.observe(node)
            }["OverviewView.useEffect"]);
            return ({
                "OverviewView.useEffect": ()=>observer.disconnect()
            })["OverviewView.useEffect"];
        }
    }["OverviewView.useEffect"], []);
    const EXAM_STEPS = [
        {
            title: "Semester-Based Structure",
            description: "Each programme follows a semester-based academic system.",
            points: [
                "The programme is divided into semesters.",
                "Fees are paid semester-wise.",
                "Every semester ends with an online examination."
            ]
        },
        {
            title: "Continuous Internal Assessment",
            description: "Evaluation is carried out through assignments, quizzes, and academic activities during the semester.",
            points: [
                "Assignments are given during the semester.",
                "Quizzes check your progress along the way.",
                "Academic activities add to your internal assessment."
            ]
        },
        {
            title: "End-Semester Online Examination",
            description: "Online monitoring examinations are conducted at the end of each semester.",
            points: [
                "The exam is conducted online with monitoring.",
                "It takes place at the end of every semester.",
                "It is taken through the digital learning platform."
            ]
        },
        {
            title: "Result Declaration",
            description: "Final results are declared after evaluation. Students meeting the criteria progress to the next semester.",
            points: [
                "Results are declared after evaluation.",
                "Evaluation includes internal assessment and the end-semester exam.",
                "Students who meet the criteria move to the next semester."
            ]
        }
    ];
    const LPU_POPULAR_PROGRAMMES = [
        {
            id: "mba",
            title: "Online MBA",
            subtitle: "Master of Business Administration",
            duration: "2 Years",
            fee: "\u20B91,86,000",
            mode: "Online",
            specialisations: [
                "Finance",
                "Marketing",
                "Human Resource",
                "Data Science",
                "Business Analytics",
                "Operations",
                "International Business",
                "Digital Marketing",
                "IT",
                "Retail",
                "Supply Chain",
                "Agri-Business"
            ]
        },
        {
            id: "mca",
            title: "Online MCA",
            subtitle: "Master of Computer Applications",
            duration: "2 Years",
            fee: "\u20B91,40,000",
            mode: "Online",
            specialisations: [
                "Cloud Computing",
                "AI & Machine Learning",
                "Full Stack Development",
                "Data Science",
                "Cyber Security",
                "Blockchain",
                "AR/VR"
            ]
        },
        {
            id: "bca",
            title: "Online BCA",
            subtitle: "Bachelor of Computer Applications",
            duration: "3 Years",
            fee: "\u20B91,59,000",
            mode: "Online",
            specialisations: [
                "Cloud & DevOps",
                "Data Analytics",
                "AI & ML"
            ]
        },
        {
            id: "bba",
            title: "Online BBA",
            subtitle: "Bachelor of Business Administration",
            duration: "3 Years",
            fee: "\u20B91,38,000",
            mode: "Online",
            specialisations: [
                "General",
                "Business Analytics"
            ]
        },
        {
            id: "ba",
            title: "Online BA",
            subtitle: "Bachelor of Arts",
            duration: "3 Years",
            fee: "\u20B91,14,000",
            mode: "Online",
            specialisations: [
                "English",
                "Political Science",
                "Sociology",
                "Psychology",
                "History",
                "Economics",
                "Public Administration",
                "Artificial Intelligence"
            ]
        },
        {
            id: "mcom",
            title: "Online M.Com",
            subtitle: "Master of Commerce",
            duration: "2 Years",
            fee: "\u20B996,000",
            mode: "Online",
            specialisations: [
                "Finance",
                "Accounting & Taxation"
            ]
        }
    ];
    const HIGHLIGHT_CATEGORIES = [
        "All",
        "Institution",
        "Academic",
        "Accreditations",
        "Technology",
        "Evaluation",
        "Info"
    ];
    const TOC_ITEMS = [
        {
            id: "latest-news",
            label: "LPU Online Latest News & Updates"
        },
        {
            id: "highlights",
            label: "LPU Online Admission Highlights 2026"
        },
        {
            id: "courses-fees",
            label: "LPU Online Courses and Fees 2026"
        },
        {
            id: "popular-programmes",
            label: "LPU Online Popular Programmes"
        },
        {
            id: "eligibility-criteria",
            label: "LPU Online Eligibility & Selection Criteria 2026"
        },
        {
            id: "admission-process",
            label: "LPU Online Admission Process 2026"
        },
        {
            id: "rankings",
            label: "LPU Online Rankings & Accreditations"
        },
        {
            id: "examination-pattern",
            label: "LPU Online Examination Pattern"
        },
        {
            id: "placements",
            label: "LPU Online Placements"
        },
        {
            id: "campus",
            label: "LPU Online Campus"
        },
        {
            id: "sample-degree",
            label: "LPU Online Sample Degree"
        },
        {
            id: "reviews-section",
            label: "LPU Online Student Reviews & FAQs"
        },
        {
            id: "compare-colleges",
            label: "Compare Colleges"
        },
        {
            id: "blogs",
            label: "Blogs"
        },
        {
            id: "related-colleges",
            label: "Related Colleges"
        }
    ];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OverviewView.useEffect": ()=>{
            const handleScroll = {
                "OverviewView.useEffect.handleScroll": ()=>{
                    const scrollPosition = window.scrollY + 160;
                    for(let i = TOC_ITEMS.length - 1; i >= 0; i--){
                        const el = document.getElementById(TOC_ITEMS[i].id);
                        if (el && el.offsetTop <= scrollPosition) {
                            setActiveSection(TOC_ITEMS[i].id);
                            break;
                        }
                    }
                }
            }["OverviewView.useEffect.handleScroll"];
            window.addEventListener("scroll", handleScroll, {
                passive: true
            });
            return ({
                "OverviewView.useEffect": ()=>window.removeEventListener("scroll", handleScroll)
            })["OverviewView.useEffect"];
        }
    }["OverviewView.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OverviewView.useEffect": ()=>{
            const getVisible = {
                "OverviewView.useEffect.getVisible": ()=>{
                    if (window.innerWidth <= 700) return 1;
                    if (window.innerWidth <= 1050) return 2;
                    return 3;
                }
            }["OverviewView.useEffect.getVisible"];
            const onResize = {
                "OverviewView.useEffect.onResize": ()=>{
                    const v = getVisible();
                    setBlogVisible(v);
                    setBlogIndex({
                        "OverviewView.useEffect.onResize": (i)=>Math.min(i, Math.max(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].blogs.posts.length - v))
                    }["OverviewView.useEffect.onResize"]);
                }
            }["OverviewView.useEffect.onResize"];
            onResize();
            window.addEventListener("resize", onResize);
            return ({
                "OverviewView.useEffect": ()=>window.removeEventListener("resize", onResize)
            })["OverviewView.useEffect"];
        }
    }["OverviewView.useEffect"], []);
    const handleTocClick = (e, id)=>{
        e.preventDefault();
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -90;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({
                top: y,
                behavior: "smooth"
            });
        }
    };
    const handleCounselingSubmit = (e)=>{
        e.preventDefault();
        const errors = {};
        if (!counselingForm.phone || !/^\d{10}$/.test(counselingForm.phone.replace(/\D/g, ""))) {
            errors.phone = "Enter a valid 10-digit phone number";
        }
        if (!counselingForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(counselingForm.email)) {
            errors.email = "Enter a valid email address";
        }
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            setFormSubmitted(true);
        }
    };
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hover:text-[#115eaf] cursor-pointer",
                                children: "Home"
                            }, void 0, false, {
                                fileName: "[project]/src/components/OverviewView.jsx",
                                lineNumber: 368,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "w-3.5 h-3.5 text-[#74777e]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/OverviewView.jsx",
                                lineNumber: 369,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hover:text-[#115eaf] cursor-pointer",
                                children: "Colleges"
                            }, void 0, false, {
                                fileName: "[project]/src/components/OverviewView.jsx",
                                lineNumber: 370,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "w-3.5 h-3.5 text-[#74777e]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/OverviewView.jsx",
                                lineNumber: 371,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hover:text-[#115eaf] cursor-pointer",
                                children: "Lovely Professional University Online"
                            }, void 0, false, {
                                fileName: "[project]/src/components/OverviewView.jsx",
                                lineNumber: 372,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "w-3.5 h-3.5 text-[#74777e]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/OverviewView.jsx",
                                lineNumber: 373,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[#000f22] font-bold",
                                children: "Overview"
                            }, void 0, false, {
                                fileName: "[project]/src/components/OverviewView.jsx",
                                lineNumber: 374,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/OverviewView.jsx",
                        lineNumber: 367,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/OverviewView.jsx",
                    lineNumber: 366,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/OverviewView.jsx",
                lineNumber: 365,
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
                                    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].hero.logoImage,
                                    alt: "LPU Logo",
                                    className: "w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl bg-white border border-[#e7eeff] p-1.5 shadow-sm shrink-0",
                                    onError: (e)=>{
                                        e.target.style.display = "none";
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 389,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "section-title text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight font-sans text-[#000f22]",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].title
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 398,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-2 mt-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold",
                                                    children: "#31 NIRF Rank"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 402,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold",
                                                    children: "NAAC A++"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 403,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold",
                                                    children: "UGC-DEB"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 404,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2.5 py-1 rounded-full bg-[#f0f3ff] border border-[#d5e3ff] text-[#115eaf] text-[11px] font-bold",
                                                    children: "AICTE"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 405,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 401,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 397,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 388,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 items-start mt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "order-2 lg:order-none lg:col-span-7 space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "section-description text-xs sm:text-sm text-[#43474d] font-normal flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                    className: "w-3.5 h-3.5 text-[#115eaf] shrink-0"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 416,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].location,
                                                " · Private · Est. ",
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].established,
                                                " ·",
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex items-center gap-0.5 font-bold text-[#B45309]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                            className: "w-3 h-3 fill-[#D97706] text-[#D97706]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 419,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].rating
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 418,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 415,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-[#2d3137] leading-relaxed font-normal",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].hero.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 423,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-[#2d3137] leading-relaxed font-normal",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].hero.heroSub
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 426,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 414,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "order-1 lg:order-none lg:col-span-5 lg:mr-[50px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl overflow-hidden border border-[#e7eeff] shadow-xs bg-[#f9f9ff]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].hero.backgroundImage,
                                            alt: "Lovely Professional University Campus",
                                            className: "w-full h-48 sm:h-60 lg:h-64 object-cover",
                                            loading: "lazy"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 436,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/OverviewView.jsx",
                                        lineNumber: 435,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 434,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 413,
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
                                            children: "₹46K – ₹1.86L"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 451,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-[#74777e]",
                                            children: "Fee Range"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 452,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 450,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block text-sm font-bold text-[#115eaf] font-sans",
                                            children: "1 – 3 Years"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 455,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-[#74777e]",
                                            children: "Duration"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 456,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 454,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block text-sm font-bold text-[#000f22] font-sans",
                                            children: "Online"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 459,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-[#74777e]",
                                            children: "Semester-based"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 460,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 458,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#f0f3ff] border border-[#e7eeff] px-4 py-2.5 rounded-xl text-center min-w-[110px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block text-sm font-bold text-[#B45309] font-sans",
                                            children: "90%"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 463,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[10px] text-[#74777e]",
                                            children: "Placement Rate"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 464,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 462,
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
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 471,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Brochure"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 467,
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
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 479,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 474,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 466,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 449,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/OverviewView.jsx",
                    lineNumber: 383,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/OverviewView.jsx",
                lineNumber: 382,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            universityNavigation,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "content-block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3",
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
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 496,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "latest-news",
                            className: "page-section card bg-[#f0f3ff] rounded-2xl border border-[#d5e3ff] scroll-mt-[130px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "section-title text-lg sm:text-xl font-bold text-[#000f22] font-sans",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].latestNews.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 509,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "section-description text-sm text-[#2d3137] leading-relaxed font-normal",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].latestNews.description
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 512,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[11px] text-[#74777e] font-normal",
                                    children: [
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].latestNews.date,
                                        " · ",
                                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].latestNews.author
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 515,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 508,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "highlights",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between flex-wrap gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xl sm:text-2xl font-bold text-[#000f22] font-sans mt-2",
                                                children: "LPU Online Highlights 2026"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                lineNumber: 526,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 525,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>onOpenBrochure(),
                                            className: "px-4 py-2 min-h-[44px] bg-white text-[#115eaf] border border-[#115eaf] rounded-xl text-xs font-bold hover:bg-[#f0f3ff] transition-all flex items-center gap-1.5 shadow-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                    className: "w-3.5 h-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 534,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Download Factsheet"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 535,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 530,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 524,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "section-description mt-[18px] text-sm font-normal text-[#2d3137] leading-relaxed",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].highlightsIntro
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 539,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2 mt-[18px]",
                                    children: HIGHLIGHT_CATEGORIES.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSelectedHighlightCategory(cat),
                                            className: `tap-chip min-h-[44px] px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${selectedHighlightCategory === cat ? "bg-[#115eaf] text-white border-[#115eaf]" : "bg-[#f0f3ff] text-[#43474d] border-[#e7eeff] hover:border-[#115eaf]"}`,
                                            children: cat
                                        }, cat, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 547,
                                            columnNumber: 52
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 546,
                                    columnNumber: 15
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
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 563,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Details"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 564,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 562,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                lineNumber: 561,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "divide-y divide-[#e7eeff]",
                                                children: (()=>{
                                                    const filtered = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].highlightsTable.filter((row)=>selectedHighlightCategory === "All" || row.category === selectedHighlightCategory);
                                                    const visible = highlightsExpanded ? filtered : filtered.slice(0, 8);
                                                    return visible.map((row, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "hover:bg-[#f0f3ff]/60 transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-2.5 px-4 font-normal text-[#000f22]",
                                                                    children: row.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 574,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-2.5 px-4 font-normal text-[#2d3137]",
                                                                    children: row.value
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 577,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, idx, true, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 573,
                                                            columnNumber: 38
                                                        }, ("TURBOPACK compile-time value", void 0)));
                                                })()
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                lineNumber: 567,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/OverviewView.jsx",
                                        lineNumber: 560,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 559,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                (()=>{
                                    const filtered = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].highlightsTable.filter((row)=>selectedHighlightCategory === "All" || row.category === selectedHighlightCategory);
                                    return filtered.length > 8 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setHighlightsExpanded(!highlightsExpanded),
                                        className: "w-full min-h-[44px] py-2 bg-[#f0f3ff] text-[#115eaf] border border-[#d5e3ff] rounded-xl text-xs font-bold hover:bg-[#e7eeff] transition-all mt-[18px]",
                                        children: highlightsExpanded ? "Show Less" : "Show More Highlights"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/OverviewView.jsx",
                                        lineNumber: 588,
                                        columnNumber: 35
                                    }, ("TURBOPACK compile-time value", void 0));
                                })(),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-5 rounded-2xl bg-[#f0f3ff] border border-[#d5e3ff] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-[18px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-[#2d3137] leading-relaxed",
                                            children: "Unlock Full College Insights to Choose the Right Program for Your Future"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 600,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-2.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onOpenBrochure(),
                                                    className: "px-4 py-2.5 bg-white text-[#115eaf] border border-[#115eaf] rounded-xl text-xs font-bold hover:bg-[#f0f3ff] transition-all flex items-center gap-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 608,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "Download Brochure"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 604,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onOpenApply(),
                                                    className: "px-5 py-2.5 bg-[#115eaf] text-white rounded-xl text-xs font-bold hover:bg-[#004689] transition-all flex items-center gap-1.5 shadow-sm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 615,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "Apply Now"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 611,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 603,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 599,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 523,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "courses-fees",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "section-title text-2xl font-bold text-[#000f22] font-sans",
                                            children: "LPU Online Courses and Fees 2026"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 627,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "section-description text-sm text-[#43474d] leading-relaxed font-normal",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].coursesFees.intro
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 630,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 626,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative mt-[18px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: courseFeeSearch,
                                            onChange: (e)=>setCourseFeeSearch(e.target.value),
                                            placeholder: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].coursesFees.searchPlaceholder,
                                            className: "w-full pl-10 pr-4 py-3 rounded-xl border border-[#e7eeff] bg-[#f9f9ff] text-sm text-[#000f22] font-normal placeholder:text-[#74777e] focus:outline-none focus:border-[#115eaf] focus:bg-white transition-all"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 639,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#74777e]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 646,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 638,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "overflow-x-auto rounded-xl border border-[#e7eeff] mt-[18px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                        className: "w-full text-left border-collapse text-xs sm:text-[13px]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "bg-[#0b2540] text-white",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-2 px-3 font-bold",
                                                            children: "Degree"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 656,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-2 px-3 font-bold",
                                                            children: "Duration"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 657,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-2 px-3 font-bold",
                                                            children: "Avg. Fees"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 658,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 655,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                lineNumber: 654,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "divide-y divide-[#e7eeff]",
                                                children: [
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].coursesFees.table.filter((c)=>c.degree.toLowerCase().includes(courseFeeSearch.toLowerCase())).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                            className: "bg-white hover:bg-[#f9f9ff] transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-2 px-3 align-top",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>{
                                                                                const course = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$coursesData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COURSES_DATA"].find((x)=>x.id === c.courseId);
                                                                                if (course) onSelectCourse(course);
                                                                            },
                                                                            className: "block text-left text-xs sm:text-[13px] font-normal text-[#115eaf] hover:text-[#004689] hover:underline transition-colors",
                                                                            children: c.degree
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                                            lineNumber: 666,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "block text-[10px] text-[#74777e] font-normal leading-tight",
                                                                            children: c.specializations
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                                            lineNumber: 675,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 665,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-2 px-3 text-[#43474d] font-normal align-top whitespace-nowrap",
                                                                    children: c.duration
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 677,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                    className: "py-2 px-3 text-[#115eaf] font-normal align-top whitespace-nowrap",
                                                                    children: c.avgFees
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 678,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, c.degree, true, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 664,
                                                            columnNumber: 16
                                                        }, ("TURBOPACK compile-time value", void 0))),
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].coursesFees.table.filter((c)=>c.degree.toLowerCase().includes(courseFeeSearch.toLowerCase())).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "bg-white",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            colSpan: 3,
                                                            className: "py-6 text-center text-xs text-[#74777e] font-normal",
                                                            children: "No programmes match your search."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 683,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OverviewView.jsx",
                                                        lineNumber: 682,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                lineNumber: 661,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/OverviewView.jsx",
                                        lineNumber: 653,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 652,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-[#74777e] font-normal mt-[18px]",
                                    children: courseFeeSearch ? `Showing ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].coursesFees.table.filter((c)=>c.degree.toLowerCase().includes(courseFeeSearch.toLowerCase())).length} out of ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].coursesFees.table.length} Degrees` : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].coursesFees.showing
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 689,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-3 mt-[18px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "px-5 py-2.5 bg-white text-[#115eaf] border border-[#115eaf] rounded-xl text-xs font-bold hover:bg-[#f0f3ff] transition-all",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].coursesFees.roiCalculator
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 697,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>onOpenBrochure(),
                                            className: "px-5 py-2.5 bg-[#115eaf] text-white rounded-xl text-xs font-bold hover:bg-[#004689] transition-all flex items-center gap-1.5 shadow-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                    className: "w-3.5 h-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 704,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].coursesFees.viewFeeStructure
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 700,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 696,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 625,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProgrammeCardsSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProgrammeCardsSection"], {
                            sectionId: "popular-programmes",
                            title: "LPU Online Popular Programmes",
                            description: "Explore LPU Online’s most popular UG and PG programmes across Management, Computer Applications, Commerce, and Arts — built for working professionals.",
                            programmes: LPU_POPULAR_PROGRAMMES,
                            onOpenBrochure: ()=>onOpenBrochure(),
                            onOpenApply: ()=>onOpenApply()
                        }, void 0, false, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 713,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "eligibility-criteria",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans mt-2",
                                            children: "LPU Online Eligibility and Selection Criteria"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 727,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block w-16 h-[5px] rounded-[5px] bg-[#115eaf] mt-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 730,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "section-description text-sm text-[#43474d] leading-relaxed font-normal",
                                            children: "Lovely Professional University provides a range of online undergraduate and postgraduate programs. The eligibility criteria depend on the course level, and admission is generally based on academic qualifications and document verification. To be eligible for admission, candidates are required to fill out the online application form, upload the required documents, and pay the program fee. Check the below criteria for LPU online eligibility and selection:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 731,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 726,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "aria-hidden": "true",
                                    className: "hidden md:grid grid-cols-[1.15fr_1.5fr_1fr] gap-x-8 px-3.5 py-2 border-b-2 border-[#000f22] text-xs font-bold text-[#43474d] mt-[18px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Course"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 747,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Eligibility"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 748,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Selection Process"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 749,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 743,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "list-none",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].eligibilityMatrix.map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "grid grid-cols-1 md:grid-cols-[1.15fr_1.5fr_1fr] gap-x-8 gap-y-1 items-center px-3.5 py-[11px] border-b border-[#e7eeff] border-l-[3px] border-l-transparent hover:bg-[#f9f9ff] hover:border-l-[#115eaf] transition-colors",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[14.5px] font-medium leading-[1.35] text-[#000f22]",
                                                    children: row.course
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 760,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-[13.5px] leading-[1.45] text-[#43474d]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "md:hidden block text-xs font-semibold text-[#74777e] mb-0.5",
                                                            children: "Eligibility"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 763,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        row.eligibility
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 762,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "md:justify-self-start text-xs font-normal leading-[1.35] text-[#115eaf] bg-[#f0f3ff] border border-[#d5e3ff] px-2.5 py-[3px] rounded-[6px]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "md:hidden block text-[10px] font-medium text-[#74777e] mb-0.5",
                                                            children: "Selection Process"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 768,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        row.selection
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 767,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 756,
                                            columnNumber: 70
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 755,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 725,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "admission-process",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans mt-2",
                                            children: "LPU Online Admission Process 2026"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 780,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "block w-16 h-[5px] rounded-[5px] bg-[#115eaf] mt-1"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 783,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "section-description text-sm text-[#43474d] leading-relaxed font-normal",
                                            children: "Lovely Professional University Online follows a simple and transparent online university admission process. Admission to online degree courses is based on academic eligibility criteria specified for each programme. Candidates can apply for LPU online admission 2026 without visiting the campus. Check the below step-by-step Lovely Professional University Online admission process 2026:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 784,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 779,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                    children: `
                .admission-flow-step {
                  --admission-badge-w: 78px;
                  display: grid;
                  grid-template-columns: calc(var(--admission-badge-w) + 18px) minmax(0, 1fr);
                  gap: 0.625rem;
                }
                .admission-flow-left {
                  display: flex;
                  flex-direction: column;
                }
                .admission-flow-badge {
                  position: relative;
                  width: var(--admission-badge-w);
                  height: 34px;
                  display: grid;
                  place-items: center;
                  background: #0b2540;
                  color: #fff;
                  font-size: 13px;
                  font-weight: 600;
                  clip-path: polygon(0 0, 84% 0, 100% 50%, 84% 100%, 0 100%);
                  letter-spacing: 0.02em;
                }
                .admission-flow-badge span {
                  padding-right: 6px;
                }
                .admission-flow-conn {
                  flex: 1;
                  min-height: 42px;
                  padding-right: 8px;
                  margin-bottom: 4px;
                  width: var(--admission-badge-w);
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: space-evenly;
                  opacity: 0;
                }
                .admission-flow-conn i {
                  display: block;
                  width: 9px;
                  height: 9px;
                  border-right: 2.5px solid #115eaf;
                  border-bottom: 2.5px solid #115eaf;
                  transform: rotate(45deg);
                  opacity: 0.22;
                }
                .admission-flow-step:last-child .admission-flow-conn {
                  display: none;
                }
                .admission-flow-body {
                  padding: 2px 0 26px;
                  opacity: 0;
                  transform: translateY(14px);
                }
                .admission-flow-step.is-visible .admission-flow-badge {
                  clip-path: polygon(0 0, 84% 0, 100% 50%, 84% 100%, 0 100%);
                  transition: clip-path 0.3s cubic-bezier(0.2, 0.9, 0.25, 1);
                }
                .admission-flow-step.is-visible .admission-flow-body {
                  opacity: 1;
                  transform: none;
                  transition: opacity 0.3s ease 0.1s, transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s;
                }
                .admission-flow-step.is-visible .admission-flow-conn {
                  opacity: 1;
                  transition: opacity 0.3s ease 0.35s;
                }
                .admission-flow-step.is-visible .admission-flow-conn i {
                  animation: admission-wave 0.9s ease-in-out infinite;
                }
                .admission-flow-step.is-visible .admission-flow-conn i:nth-child(2) {
                  animation-delay: 0.15s;
                }
                .admission-flow-step.is-visible .admission-flow-conn i:nth-child(3) {
                  animation-delay: 0.3s;
                }
                @keyframes admission-wave {
                  0%, 100% {
                    opacity: 0.2;
                    transform: rotate(45deg) translate(0, 0);
                  }
                  45% {
                    opacity: 1;
                    transform: rotate(45deg) translate(2px, 2px);
                  }
                }
                @media (max-width: 640px) {
                  .admission-flow-step {
                    --admission-badge-w: 66px;
                    gap: 0.5rem;
                  }
                  .admission-flow-badge {
                    height: 30px;
                    font-size: 12px;
                  }
                  .admission-flow-body h3 {
                    font-size: 16px;
                  }
                  .admission-flow-body p {
                    font-size: 14px;
                  }
                }
                @media (prefers-reduced-motion: reduce) {
                  .admission-flow-body,
                  .admission-flow-conn,
                  .admission-flow-badge {
                    opacity: 1 !important;
                    transform: none !important;
                    transition: none !important;
                  }
                  .admission-flow-step.is-visible .admission-flow-conn i {
                    animation: none !important;
                  }
                }
              `
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 792,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-[18px] flex flex-col gap-3",
                                    children: ADMISSION_FLOW_STEPS.map((step, i)=>{
                                        const stepNo = String(i + 1).padStart(2, "0");
                                        const isVisible = visibleAdmissionSteps.includes(i);
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "data-step-index": i,
                                            className: `admission-flow-step ${isVisible ? "is-visible" : ""}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "admission-flow-left",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "admission-flow-badge",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    "Step ",
                                                                    stepNo
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                                lineNumber: 921,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 920,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "admission-flow-conn",
                                                            "aria-hidden": "true",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 924,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 925,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 926,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 923,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 919,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "admission-flow-body",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "mb-1 text-[18px] font-semibold leading-[1.35] text-[#000f22] font-sans",
                                                            children: step.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 931,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "m-0 text-[15px] leading-[1.55] text-[#43474d] font-normal",
                                                            children: step.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 934,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 930,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 914,
                                            columnNumber: 12
                                        }, ("TURBOPACK compile-time value", void 0));
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 910,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 778,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "rankings",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "section-title text-2xl font-extrabold text-[#000f22] font-sans",
                                            children: "LPU Online Rankings and Accreditations"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 948,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "section-description text-xs text-[#43474d] leading-relaxed font-normal",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].rankingsAndAccreditations.intro
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 951,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 947,
                                    columnNumber: 15
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
                                                            className: "py-3 px-5 font-bold",
                                                            children: "Authority / Body"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 960,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-5 font-bold",
                                                            children: "Recognition / Status"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 961,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 959,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                lineNumber: 958,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "divide-y divide-[#e7eeff]",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].rankingsAndAccreditations.table.map((r, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: idx % 2 === 0 ? "bg-[#f0f3ff]" : "",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-3 px-5 font-normal text-[#000f22]",
                                                                children: r.authority
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                                lineNumber: 966,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-3 px-5 text-[#43474d] font-normal",
                                                                children: r.status
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                                lineNumber: 967,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, idx, true, {
                                                        fileName: "[project]/src/components/OverviewView.jsx",
                                                        lineNumber: 965,
                                                        columnNumber: 88
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                lineNumber: 964,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/OverviewView.jsx",
                                        lineNumber: 957,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 956,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 946,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "examination-pattern",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans mt-2",
                                            children: "LPU Online Examination Pattern"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 979,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "section-description text-sm text-[#43474d] leading-relaxed font-normal",
                                            children: "Lovely Professional University conducts examinations for its online courses through its digital learning platform. The evaluation system usually includes assignments, internal assessments, and end-term examinations to evaluate students' performance during the course. Check below the Lovely Professional University examination process:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 982,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 978,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                    children: `
                .exam-step {
                  --exam-badge-w: 78px;
                  position: relative;
                  display: grid;
                  grid-template-columns: calc(var(--exam-badge-w) + 18px) minmax(0, 1fr);
                  padding-bottom: 30px;
                }
                .exam-step:last-child {
                  padding-bottom: 0;
                }
                .exam-step:not(:last-child)::before {
                  content: "";
                  position: absolute;
                  left: calc(var(--exam-badge-w) / 2 - 5px);
                  top: 40px;
                  bottom: 6px;
                  width: 3px;
                  background: repeating-linear-gradient(180deg, #0b2540 0 4px, transparent 4px 9px);
                  animation: exam-flow-down 0.9s linear infinite;
                }
                @keyframes exam-flow-down {
                  from { background-position: 0 0; }
                  to { background-position: 0 9px; }
                }
                .exam-badge {
                  width: var(--exam-badge-w);
                  height: 34px;
                  display: grid;
                  place-items: center;
                  background: #0b2540;
                  color: #fff;
                  font-size: 13px;
                  font-weight: 600;
                  clip-path: polygon(0 0, 84% 0, 100% 50%, 84% 100%, 0 100%);
                }
                .exam-badge span {
                  padding-right: 6px;
                }
                .exam-body h3 {
                  margin: 2px 0 3px;
                  font-size: 18px;
                  font-weight: 600;
                  line-height: 1.35;
                  color: #000f22;
                }
                .exam-body p {
                  margin: 0;
                  font-size: 15px;
                  line-height: 1.55;
                  color: #43474d;
                }
                .exam-step-reveal {
                  opacity: 0;
                  transform: translateY(20px);
                  transition: opacity 0.6s ease, transform 0.6s ease;
                }
                .exam-step-reveal.show {
                  opacity: 1;
                  transform: none;
                }
                @media (max-width: 640px) {
                  .exam-step {
                    --exam-badge-w: 66px;
                  }
                  .exam-badge {
                    font-size: 12px;
                  }
                  .exam-body h3 {
                    font-size: 16px;
                  }
                  .exam-body p {
                    font-size: 14px;
                  }
                }
                @media (prefers-reduced-motion: reduce) {
                  .exam-step::before,
                  .exam-step-reveal {
                    animation: none !important;
                    transition: none !important;
                    opacity: 1 !important;
                    transform: none !important;
                  }
                }
              `
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 990,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-[18px]",
                                    children: EXAM_STEPS.map((step, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "exam-step exam-step-reveal",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "exam-badge",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "Step ",
                                                                String(index + 1).padStart(2, "0")
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1080,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OverviewView.jsx",
                                                        lineNumber: 1079,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1078,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "exam-body",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            children: step.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1084,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: step.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1085,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1083,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, step.title, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1077,
                                            columnNumber: 50
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1076,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 977,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "placements",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "section-title text-2xl font-extrabold text-[#000f22] font-sans",
                                            children: "LPU Online Placements"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1096,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "section-description text-xs text-[#43474d] leading-relaxed font-normal",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].placements.intro
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1099,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1095,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 md:grid-cols-4 gap-3 mt-[18px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3.5 rounded-xl bg-[#f9f9ff] border border-[#e7eeff] text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-xl font-extrabold text-[#115eaf] font-sans leading-none",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].placements.stats.placementRate
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1109,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-[10px] font-normal text-[#43474d] uppercase tracking-wide mt-1.5",
                                                    children: "Placement Rate"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1110,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1108,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3.5 rounded-xl bg-[#f9f9ff] border border-[#e7eeff] text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-xl font-extrabold text-emerald-700 font-sans leading-none",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].placements.stats.highestPackage
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1113,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-[10px] font-normal text-[#43474d] uppercase tracking-wide mt-1.5",
                                                    children: "Highest Package"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1114,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1112,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3.5 rounded-xl bg-[#f9f9ff] border border-[#e7eeff] text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-xl font-extrabold text-[#000f22] font-sans leading-none",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].placements.stats.hiringPartners
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1117,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-[10px] font-normal text-[#43474d] uppercase tracking-wide mt-1.5",
                                                    children: "Hiring Partners"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1118,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1116,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-3.5 rounded-xl bg-[#f9f9ff] border border-[#e7eeff] text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-xl font-extrabold text-[#B45309] font-sans leading-none",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].placements.stats.internshipsCount
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1121,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-[10px] font-normal text-[#43474d] uppercase tracking-wide mt-1.5",
                                                    children: "Internships"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1122,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1120,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1107,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-[18px]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RecruiterScroll, {}, void 0, false, {
                                        fileName: "[project]/src/components/OverviewView.jsx",
                                        lineNumber: 1127,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1126,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 1094,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "campus",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans",
                                            children: "LPU Online Campus"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1136,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "section-description text-xs sm:text-sm text-[#43474d] leading-relaxed font-normal",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].campus.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1139,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1135,
                                    columnNumber: 15
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
                                                            children: "Mode of Transport"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1148,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                            className: "py-3 px-4 font-bold",
                                                            children: "Details"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1149,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1147,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                lineNumber: 1146,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                                className: "divide-y divide-[#e7eeff]",
                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].campus.travelTable.map((t, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                        className: "hover:bg-[#f0f3ff]/60 transition-colors",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-3.5 px-4 font-normal text-[#000f22] align-top whitespace-nowrap",
                                                                children: t.mode
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                                lineNumber: 1154,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                                className: "py-3.5 px-4 text-[#43474d] leading-relaxed font-normal",
                                                                children: t.detail
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                                lineNumber: 1155,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, idx, true, {
                                                        fileName: "[project]/src/components/OverviewView.jsx",
                                                        lineNumber: 1153,
                                                        columnNumber: 75
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                lineNumber: 1152,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/OverviewView.jsx",
                                        lineNumber: 1145,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1144,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                                    children: `
                .campus-marquee {
                  overflow: hidden;
                  position: relative;
                  border-radius: 18px;
                  border: 1px solid #e7eeff;
                  background: #f0f3ff;
                  margin-top: 18px;
                  padding: 10px;
                }
                .campus-marquee-track {
                  display: flex;
                  align-items: stretch;
                  gap: 14px;
                  width: max-content;
                  padding-right: 10px;
                  animation: campus-marquee 24s linear infinite;
                }
                .campus-marquee-track:hover {
                  animation-play-state: paused;
                }
                .campus-marquee-item {
                  flex: 0 0 auto;
                  width: min(320px, 72vw);
                  background: #ffffff;
                  overflow: hidden;
                  border: 1px solid #e7eeff;
                  border-radius: 18px;
                  box-shadow: 0 10px 24px rgba(18, 37, 71, 0.08);
                }
                .campus-marquee-item img {
                  display: block;
                  width: 100%;
                  height: 220px;
                  object-fit: cover;
                  border-radius: 18px 18px 0 0;
                }
                .campus-marquee-item figcaption {
                  padding: 10px 12px;
                  font-size: 12px;
                  color: #43474d;
                  background: white;
                  border-top: 1px solid #e7eeff;
                  border-radius: 0 0 18px 18px;
                }
                @keyframes campus-marquee {
                  from {
                    transform: translateX(0);
                  }
                  to {
                    transform: translateX(-50%);
                  }
                }
                @media (max-width: 640px) {
                  .campus-marquee {
                    padding: 8px;
                  }
                  .campus-marquee-track {
                    gap: 10px;
                  }
                  .campus-marquee-item {
                    width: min(280px, 80vw);
                  }
                  .campus-marquee-item img {
                    height: 180px;
                  }
                }
              `
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1164,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "campus-marquee",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "campus-marquee-track",
                                        children: [
                                            ...CAMPUS_IMAGES,
                                            ...CAMPUS_IMAGES
                                        ].map((image, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
                                                className: "campus-marquee-item",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: image.src,
                                                        alt: image.alt,
                                                        loading: "lazy"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OverviewView.jsx",
                                                        lineNumber: 1236,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                                                        children: image.alt
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OverviewView.jsx",
                                                        lineNumber: 1237,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, `${image.src}-${index}`, true, {
                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                lineNumber: 1235,
                                                columnNumber: 79
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/OverviewView.jsx",
                                        lineNumber: 1234,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1233,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap gap-2 pt-1 mt-[18px]",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].campus.gallery.map((g, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "px-3 py-1.5 rounded-lg bg-[#f0f3ff] border border-[#d5e3ff] text-[11px] font-normal text-[#115eaf]",
                                            children: g
                                        }, i, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1243,
                                            columnNumber: 65
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1242,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 1134,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "sample-degree",
                            className: "page-section card bg-[#f0f3ff] rounded-2xl border border-[#d5e3ff]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#d5e3ff]/70",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "text-xl sm:text-2xl font-bold text-[#000f22] font-sans",
                                                children: "LPU Online Sample Degree"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                lineNumber: 1258,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1257,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].sampleDegree.imageUrl,
                                            target: "_blank",
                                            rel: "noreferrer",
                                            className: "px-3.5 py-2 bg-white text-[#115eaf] border border-[#d5e3ff] rounded-xl text-xs font-semibold hover:bg-[#e0ecff] transition-all flex items-center gap-1.5 shrink-0 shadow-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "View Full-Size Certificate"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1269,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                    className: "w-3.5 h-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1270,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1263,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1256,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-12 gap-6 items-start mt-[18px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "md:col-span-7 space-y-3.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs sm:text-sm text-[#2d3137] leading-relaxed font-normal",
                                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].sampleDegree.description
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1279,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap items-center gap-2 text-[11px] text-[#2d3137]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "p-1.5 rounded-lg bg-white/80 border border-[#d5e3ff] flex items-center gap-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                    className: "w-3.5 h-3.5 text-emerald-600 shrink-0"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 1285,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                "UPSC & PSC Eligible"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1284,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "p-1.5 rounded-lg bg-white/80 border border-[#d5e3ff] flex items-center gap-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                    className: "w-3.5 h-3.5 text-emerald-600 shrink-0"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 1289,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                "WES Evaluated (US & Canada)"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1288,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1283,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap items-center gap-2.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>onOpenApply(),
                                                            className: "px-4 py-2 bg-[#115eaf] text-white rounded-lg text-xs font-semibold shadow hover:bg-[#004689] active:scale-95 transition-all flex items-center gap-1.5",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Apply for Degree Enrollment"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                                lineNumber: 1299,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1295,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: onOpenHelpDesk,
                                                            className: "px-3.5 py-2 bg-white text-[#000f22] border border-[#c4c6ce] rounded-lg text-xs font-medium hover:bg-[#f0f3ff] transition-all",
                                                            children: "Verify Legal Equivalence"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1301,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1294,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1278,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "md:col-span-5",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-xl overflow-hidden border-2 border-white shadow-md bg-white p-2.5 group hover:shadow-lg transition-all",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].sampleDegree.imageUrl,
                                                        alt: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].sampleDegree.altText,
                                                        className: "w-full h-auto object-contain rounded group-hover:scale-102 transition-transform duration-300 max-h-64"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OverviewView.jsx",
                                                        lineNumber: 1312,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center pt-1.5 text-[10px] text-[#74777e] font-normal",
                                                        children: "Specimen UGC-Entitled Degree Format"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OverviewView.jsx",
                                                        lineNumber: 1317,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                lineNumber: 1311,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1310,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1277,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 1252,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "reviews-section",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#e7eeff]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "section-title text-xl sm:text-2xl font-extrabold text-[#000f22] font-sans mt-2",
                                                    children: "LPU Online Reviews"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1334,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "section-description text-xs text-[#74777e]",
                                                    children: "Authentic feedback from working executives, entrepreneurs, and graduates studying on LPU e-Connect"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1337,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1333,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center justify-center gap-3 bg-[#f0f3ff] border border-[#d5e3ff] p-2.5 rounded-xl shrink-0 max-w-full",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "block text-lg font-black text-[#115eaf]",
                                                            children: "94%"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1344,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[9px] text-[#43474d] font-bold",
                                                            children: "Completion Rate"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1345,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1343,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-6 w-px bg-[#d5e3ff]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1347,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "block text-lg font-black text-[#000f22]",
                                                            children: "25,000+"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1349,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[9px] text-[#43474d] font-bold",
                                                            children: "Active Learners"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1350,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1348,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-6 w-px bg-[#d5e3ff]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1352,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "block text-lg font-black text-emerald-700",
                                                            children: "100%"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1354,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[9px] text-[#43474d] font-bold",
                                                            children: "Verified Profiles"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1355,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1353,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1342,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1332,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center justify-between gap-2 mt-[18px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-1.5 text-xs",
                                            children: [
                                                "All",
                                                "Online MBA",
                                                "Online MCA",
                                                "Online BBA & BCA",
                                                "Online M.Com"
                                            ].map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setSelectedReviewCategory(cat),
                                                    className: `px-3 py-1 rounded-lg font-bold transition-all text-[11px] max-md:min-h-[36px] max-md:px-4 ${selectedReviewCategory === cat ? "bg-[#115eaf] text-white shadow-xs" : "bg-[#f0f3ff] text-[#43474d] hover:bg-[#e0ecff] hover:text-[#000f22]"}`,
                                                    children: cat
                                                }, cat, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1365,
                                                    columnNumber: 105
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1364,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[11px] text-[#74777e]",
                                            children: "Showing authentic verified reviews"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1374,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1363,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-[18px]",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].testimonials.filter((t)=>{
                                        if (selectedReviewCategory === "All") return true;
                                        if (selectedReviewCategory === "Online MBA") return t.course.includes("MBA");
                                        if (selectedReviewCategory === "Online MCA") return t.course.includes("MCA");
                                        if (selectedReviewCategory === "Online BBA & BCA") return t.course.includes("BBA") || t.course.includes("BCA");
                                        if (selectedReviewCategory === "Online M.Com") return t.course.includes("M.Com");
                                        return true;
                                    }).map((t, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-white rounded-xl border border-[#e7eeff] hover:border-[#115eaf]/70 hover:shadow-md transition-all p-3 flex flex-col justify-between gap-2.5 group relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between gap-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex text-amber-400 gap-0.5 items-center",
                                                                    children: [
                                                                        [
                                                                            ...Array(t.rating)
                                                                        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                                className: "w-3 h-3 fill-current text-amber-400"
                                                                            }, i, false, {
                                                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                                                lineNumber: 1400,
                                                                                columnNumber: 65
                                                                            }, ("TURBOPACK compile-time value", void 0))),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] font-normal text-[#000f22] ml-1.5",
                                                                            children: "5.0"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                                            lineNumber: 1401,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 1399,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-normal bg-[#eef4ff] text-[#115eaf] border border-[#d5e3ff]",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                            className: "w-2.5 h-2.5 text-[#115eaf]"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                                            lineNumber: 1404,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        t.tag || "Verified Learner"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 1403,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1398,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between gap-1 text-[10px]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-normal text-[#115eaf] truncate",
                                                                    children: t.course
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 1413,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[9px] text-[#74777e] shrink-0 font-normal",
                                                                    children: t.batch
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 1416,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1412,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative pt-0.5",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-[11px] text-[#2d3137] leading-relaxed font-normal line-clamp-3",
                                                                children: [
                                                                    '"',
                                                                    t.text,
                                                                    '"'
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                                lineNumber: 1425,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1424,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1397,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-2 border-t border-[#f0f3ff] flex items-center justify-between gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2 min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-7 h-7 rounded-full bg-gradient-to-tr from-[#115eaf] to-[#004689] text-white flex items-center justify-center text-[10px] font-semibold shrink-0 shadow-xs",
                                                                    children: t.avatar
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 1436,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "min-w-0",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-1",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "font-normal text-[11px] text-[#000f22] truncate block",
                                                                                    children: t.studentName
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                                    lineNumber: 1441,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                                                    className: "w-2.5 h-2.5 text-emerald-600 shrink-0"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                                    lineNumber: 1442,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                                            lineNumber: 1440,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[10px] text-[#115eaf] font-normal truncate block leading-tight",
                                                                            children: t.profession
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                                            lineNumber: 1444,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-[9px] text-[#74777e] truncate block font-normal",
                                                                            children: t.company
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                                            lineNumber: 1447,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 1439,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1435,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[9px] text-[#74777e] flex items-center gap-0.5 shrink-0 font-normal",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                    className: "w-2.5 h-2.5 text-[#74777e]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 1454,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: t.location
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 1455,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1453,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1434,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, idx, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1390,
                                            columnNumber: 22
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1382,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#f0f3ff] via-white to-[#f0f3ff] border border-[#d5e3ff] flex flex-col sm:flex-row items-center justify-between gap-3 mt-[18px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1 text-center sm:text-left",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bold text-sm text-[#000f22] font-sans",
                                                    children: "Join 25,000+ ambitious working professionals at LPU Online"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1466,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-[#43474d]",
                                                    children: "Admissions for Spring 2026 intake are currently open. Book a 1-on-1 counseling session with our admissions team."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1469,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1465,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center justify-center gap-2.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onOpenApply(),
                                                    className: "px-5 py-2.5 bg-[#115eaf] text-white rounded-xl text-xs font-bold shadow hover:bg-[#004689] active:scale-95 transition-all",
                                                    children: "Apply Now 2026"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1474,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onOpenHelpDesk(),
                                                    className: "px-4 py-2.5 bg-white text-[#000f22] border border-[#000f22] rounded-xl text-xs font-bold hover:bg-[#f0f3ff] active:scale-95 transition-all",
                                                    children: "Talk to Counselor"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1480,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1473,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1464,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-3 mt-[18px] border-t border-[#e7eeff]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "section-title text-xl font-bold text-[#000f22] font-sans",
                                            children: "Frequently Asked Questions (LPU Online)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1493,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-[12px] mt-[18px]",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].faqs.map((faq, idx)=>{
                                                const isOpen = openFaqIndex === idx;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "border border-[#e7eeff] rounded-xl overflow-hidden",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setOpenFaqIndex(isOpen ? null : idx),
                                                            className: "w-full px-4 py-3 text-left flex items-center justify-between font-medium text-xs sm:text-sm text-[#000f22] hover:text-[#115eaf] bg-white transition-colors",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: faq.question
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 1504,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                    className: `w-4 h-4 text-[#115eaf] shrink-0 ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 1505,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1500,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "px-4 pb-3 text-xs text-[#43474d] bg-[#f9f9ff] border-t border-[#e7eeff] leading-relaxed",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "pt-3 font-normal",
                                                                children: faq.answer
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                                lineNumber: 1508,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1507,
                                                            columnNumber: 36
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, idx, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1499,
                                                    columnNumber: 12
                                                }, ("TURBOPACK compile-time value", void 0));
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1496,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1492,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 1328,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            id: "compare-colleges",
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "section-title text-xl sm:text-2xl font-bold text-[#000f22] font-sans",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].compareSection.title
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1520,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "section-description text-sm text-[#43474d] leading-relaxed font-normal",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].compareSection.description
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1523,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_55px_minmax(0,1fr)] items-stretch gap-3 p-4 border border-[#e7eeff] rounded-2xl bg-white shadow-sm mt-[18px]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-h-[220px] rounded-xl border border-[#e7eeff] bg-[#f0f3ff] p-4 flex flex-col justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "inline-flex mb-2 px-2 py-1 rounded-full bg-[#e7eeff] text-[#115eaf] text-[11px] font-bold",
                                                            children: "Selected"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1536,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex gap-4 items-center",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "w-[115px] h-[85px] shrink-0 rounded-lg border border-[#e7eeff] bg-white flex items-center justify-center overflow-hidden",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].hero.logoImage,
                                                                        alt: "LPU Logo",
                                                                        className: "max-w-full max-h-full object-contain p-1.5",
                                                                        onError: (e)=>{
                                                                            e.target.style.display = "none";
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/OverviewView.jsx",
                                                                        lineNumber: 1542,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 1541,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                            className: "mb-1.5 text-[19px] leading-tight font-extrabold text-[#000f22] font-sans",
                                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                                            lineNumber: 1552,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-[7.5px] flex items-center gap-1.5 text-sm text-[#43474d]",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                                    className: "w-3.5 h-3.5 text-[#115eaf] shrink-0"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                                    lineNumber: 1556,
                                                                                    columnNumber: 27
                                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                                "Phagwara, Punjab"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                                            lineNumber: 1555,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 1551,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1540,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-wrap gap-1.5 mt-3",
                                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$apiData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEGREEFYD_LPU_API"].approvals.slice(0, 4).map((tag)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "px-2 py-1 rounded-[7px] bg-white border border-[#d5e3ff] text-[11px] font-normal text-[#43474d]",
                                                                    children: tag
                                                                }, tag, false, {
                                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                                    lineNumber: 1563,
                                                                    columnNumber: 77
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1562,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1535,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onOpenBrochure(),
                                                    className: "w-full h-11 mt-4 flex items-center justify-center gap-2 rounded-lg border border-[#115eaf] bg-white text-[#115eaf] text-sm font-bold hover:bg-[#f0f3ff] transition-all",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1573,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "Brochure"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1569,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1534,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "compare-vs flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "w-11 h-11 rounded-full flex items-center justify-center bg-[#115eaf] text-white text-sm font-extrabold",
                                                children: "VS"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                lineNumber: 1582,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1581,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-h-[220px] rounded-xl border border-dashed border-[#d5e3ff] bg-[#f9f9ff] p-4 flex flex-col items-center justify-center text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-full border border-[#d5e3ff] bg-white flex items-center justify-center text-[#115eaf] text-2xl font-light mb-2.5",
                                                    children: "+"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1591,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "add-content",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-lg font-extrabold text-[#000f22] font-sans",
                                                            children: "Add College"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1595,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-[7.5px] text-[13px] leading-relaxed text-[#43474d] font-normal",
                                                            children: "Select another college to compare side by side."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1598,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1594,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>onOpenHelpDesk(),
                                                    className: "w-full h-11 mt-4 rounded-lg border-none bg-[#0b2540] text-white text-sm font-bold hover:bg-[#011c37] transition-all",
                                                    children: "Add College"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1602,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1590,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1529,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 1519,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BlogsListSection$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlogsListSection"], {
                            onOpenHelpDesk: onOpenHelpDesk,
                            className: "page-section card bg-white rounded-2xl border border-[#e7eeff] shadow-xs"
                        }, void 0, false, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 1615,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/OverviewView.jsx",
                    lineNumber: 492,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/OverviewView.jsx",
                lineNumber: 491,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setTocOpen(!tocOpen),
                className: "fixed bottom-36 left-4 z-30 w-11 h-11 rounded-full bg-[#0b2540] text-white shadow-lg flex items-center justify-center hover:bg-[#115eaf] transition-colors md:bottom-6",
                "aria-label": "Toggle Table of Contents",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                    className: "w-5 h-5"
                }, void 0, false, {
                    fileName: "[project]/src/components/OverviewView.jsx",
                    lineNumber: 1631,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/OverviewView.jsx",
                lineNumber: 1626,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            tocOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-40 flex justify-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-black/30",
                        onClick: ()=>setTocOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/src/components/OverviewView.jsx",
                        lineNumber: 1641,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-72 max-w-[85vw] bg-white shadow-2xl h-full overflow-y-auto animate-slide-in-left",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-5 space-y-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between pb-3 border-b border-[#e7eeff]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                    className: "w-4 h-4 text-[#115eaf]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1653,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-bold text-sm text-[#000f22]",
                                                    children: "Table of Contents"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1654,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1652,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setTocOpen(false),
                                            className: "w-7 h-7 rounded-lg bg-[#f0f3ff] text-[#43474d] flex items-center justify-center hover:bg-[#e7eeff] transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-bold",
                                                children: "✕"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                lineNumber: 1660,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1656,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1651,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-1",
                                    children: TOC_ITEMS.map((item)=>{
                                        const isActive = activeSection === item.id;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: `#${item.id}`,
                                                onClick: (e)=>{
                                                    handleTocClick(e, item.id);
                                                    setTocOpen(false);
                                                },
                                                className: `block px-3 py-2 rounded-lg text-xs transition-all ${isActive ? "bg-[#eef4ff] text-[#115eaf] font-bold" : "text-[#475569] hover:text-[#000f22] hover:bg-[#f8faff]"}`,
                                                children: item.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                lineNumber: 1671,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, item.id, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1670,
                                            columnNumber: 12
                                        }, ("TURBOPACK compile-time value", void 0));
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1667,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#0b2540] text-white rounded-xl p-4 space-y-2.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-8 h-8 rounded-full bg-[#115eaf] text-white flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OverviewView.jsx",
                                                        lineNumber: 1691,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1690,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-bold text-xs leading-tight",
                                                            children: "UGC-DEB Expert Desk"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1694,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] text-[#b1c8eb]",
                                                            children: "Online Siksha Advisory"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OverviewView.jsx",
                                                            lineNumber: 1695,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1693,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1689,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-[#b1c8eb] leading-relaxed",
                                            children: "Need guidance on degree equivalence, govt job validity, or fee plans?"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1698,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                onOpenHelpDesk();
                                                setTocOpen(false);
                                            },
                                            className: "w-full py-2 bg-[#115eaf] text-white rounded-lg text-[11px] font-bold hover:bg-[#004689] transition-all",
                                            children: "Enquire Now"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1701,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1688,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 1647,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/OverviewView.jsx",
                        lineNumber: 1646,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/OverviewView.jsx",
                lineNumber: 1637,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0)),
            counselPanelOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-40 bg-black/30",
                onClick: ()=>setCounselPanelOpen(false)
            }, void 0, false, {
                fileName: "[project]/src/components/OverviewView.jsx",
                lineNumber: 1718,
                columnNumber: 28
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `w-72 max-w-[calc(100vw-48px)] bg-white border border-[#e7eeff] shadow-2xl rounded-2xl transition-all duration-300 ${counselPanelOpen ? "opacity-100 translate-x-0 pointer-events-auto" : "opacity-0 translate-x-3 pointer-events-none"}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between px-4 py-3 border-b border-[#e7eeff]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-7 h-7 rounded-full bg-[#d5e3ff] flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2d$call$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PhoneCall$3e$__["PhoneCall"], {
                                                    className: "w-3.5 h-3.5 text-[#115eaf]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1730,
                                                    columnNumber: 15
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                lineNumber: 1729,
                                                columnNumber: 13
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-xs font-bold text-[#000f22]",
                                                children: "Get Free Counselling"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/OverviewView.jsx",
                                                lineNumber: 1732,
                                                columnNumber: 13
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/OverviewView.jsx",
                                        lineNumber: 1728,
                                        columnNumber: 11
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setCounselPanelOpen(false),
                                        className: "tap-hit w-11 h-11 rounded-md bg-[#f0f3ff] text-[#43474d] flex items-center justify-center hover:bg-[#e7eeff] transition-colors text-[10px] font-bold",
                                        children: "✕"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/OverviewView.jsx",
                                        lineNumber: 1734,
                                        columnNumber: 11
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/OverviewView.jsx",
                                lineNumber: 1727,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4",
                                children: !formSubmitted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    onSubmit: handleCounselingSubmit,
                                    className: "space-y-2.5",
                                    noValidate: true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "tel",
                                                    required: true,
                                                    pattern: "[0-9]{10}",
                                                    value: counselingForm.phone,
                                                    onChange: (e)=>{
                                                        setCounselingForm({
                                                            ...counselingForm,
                                                            phone: e.target.value
                                                        });
                                                        if (formErrors.phone) setFormErrors({
                                                            ...formErrors,
                                                            phone: ""
                                                        });
                                                    },
                                                    placeholder: "Phone Number (+91)",
                                                    className: `w-full px-3 py-2 rounded-lg border text-[11px] text-[#000f22] focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 outline-none ${formErrors.phone ? "border-red-500" : "border-[#c4c6ce]"}`,
                                                    "aria-invalid": formErrors.phone ? "true" : "false",
                                                    "aria-describedby": formErrors.phone ? "phone-error" : void 0
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1745,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                formErrors.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    id: "phone-error",
                                                    role: "alert",
                                                    "aria-live": "polite",
                                                    className: "mt-1 text-[11px] text-red-600",
                                                    children: formErrors.phone
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1759,
                                                    columnNumber: 38
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1744,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "email",
                                                    required: true,
                                                    value: counselingForm.email,
                                                    onChange: (e)=>{
                                                        setCounselingForm({
                                                            ...counselingForm,
                                                            email: e.target.value
                                                        });
                                                        if (formErrors.email) setFormErrors({
                                                            ...formErrors,
                                                            email: ""
                                                        });
                                                    },
                                                    placeholder: "Email Address",
                                                    className: `w-full px-3 py-2 rounded-lg border text-[11px] text-[#000f22] focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/20 outline-none ${formErrors.email ? "border-red-500" : "border-[#c4c6ce]"}`,
                                                    "aria-invalid": formErrors.email ? "true" : "false",
                                                    "aria-describedby": formErrors.email ? "email-error" : void 0
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1762,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                formErrors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    id: "email-error",
                                                    role: "alert",
                                                    "aria-live": "polite",
                                                    className: "mt-1 text-[11px] text-red-600",
                                                    children: formErrors.email
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1775,
                                                    columnNumber: 38
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1761,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: counselingForm.course,
                                            onChange: (e)=>setCounselingForm({
                                                    ...counselingForm,
                                                    course: e.target.value
                                                }),
                                            className: "w-full px-3 py-2 rounded-lg border border-[#c4c6ce] text-[11px] text-[#000f22] focus:border-[#115eaf] outline-none cursor-pointer bg-white",
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$coursesData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COURSES_DATA"].map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: c.id,
                                                    children: c.name
                                                }, c.id, false, {
                                                    fileName: "[project]/src/components/OverviewView.jsx",
                                                    lineNumber: 1782,
                                                    columnNumber: 42
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1777,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "w-full py-2 min-h-[44px] bg-[#115eaf] text-white rounded-lg text-[11px] font-bold shadow-sm hover:bg-[#004689] active:scale-95 transition-all",
                                            children: "Submit"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1784,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1743,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "py-4 text-center space-y-1.5 text-[11px] animate-in fade-in",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                            className: "w-6 h-6 text-emerald-600 mx-auto"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1791,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-[#000f22] block",
                                            children: "Callback Requested!"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1792,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[#43474d]",
                                            children: [
                                                "We will call you at +91 ",
                                                counselingForm.phone,
                                                " shortly."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1793,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setFormSubmitted(false),
                                            className: "text-[10px] font-bold text-[#115eaf] hover:underline",
                                            children: "Submit another enquiry"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OverviewView.jsx",
                                            lineNumber: 1794,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OverviewView.jsx",
                                    lineNumber: 1790,
                                    columnNumber: 23
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/OverviewView.jsx",
                                lineNumber: 1742,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/OverviewView.jsx",
                        lineNumber: 1724,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setCounselPanelOpen(!counselPanelOpen),
                        className: "hidden lg:flex w-12 h-[200px] bg-[#115eaf] hover:bg-[#004689] rounded-l-2xl shadow-md items-center justify-center transition-colors",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "block text-white text-sm font-normal whitespace-nowrap -rotate-90",
                            children: counselPanelOpen ? "Close" : "Free Apply"
                        }, void 0, false, {
                            fileName: "[project]/src/components/OverviewView.jsx",
                            lineNumber: 1808,
                            columnNumber: 9
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/OverviewView.jsx",
                        lineNumber: 1804,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/OverviewView.jsx",
                lineNumber: 1720,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/OverviewView.jsx",
        lineNumber: 361,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(OverviewView, "D9wCLi1ZRwmH6c1q6D5e+6Al4Ik=");
_c1 = OverviewView;
var _c, _c1;
__turbopack_context__.k.register(_c, "RecruiterScroll");
__turbopack_context__.k.register(_c1, "OverviewView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_OverviewView_jsx_17v9yqru3zu7u._.js.map