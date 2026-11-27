import { useState, useEffect } from "react";
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Phone,
  User,
  GraduationCap,
  ChevronDown,
  CheckCircle,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  LogIn
} from "lucide-react";
import { submitLead, sanitizeIndianPhone, INDIAN_PHONE_PATTERN, validateLeadFields } from "../services/leadApi";

export const LoginModal = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  // isSignUp controls the sliding animation: false = Sign In, true = Sign Up
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("student@onlinesiksha.com");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);

  // Sign up fields
  const [name, setName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [program, setProgram] = useState("Online MBA");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleModalClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSignIn = (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Please enter both email and password.");
      return;
    }
    const cleanInput = email.trim();
    const isPhone = /^\d{10}$/.test(sanitizeIndianPhone(cleanInput));
    submitLead({
      name: "Student Login",
      email: isPhone ? "student@onlinesiksha.com" : cleanInput,
      phone_number: isPhone ? sanitizeIndianPhone(cleanInput) : "9876543210",
      form_name: "Student Sign In Form",
      source: "OS"
    });
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: "Aditya Shah",
        email: email,
        phone: "+91 98765 43210",
        enrolledCourse: "Online MBA - Lovely Professional University",
        applicationId: "OS-2026-89421"
      };
      setLoggedInUser(user);
      setSuccessMsg(`Welcome back, ${user.name}!`);
      if (onLoginSuccess) onLoginSuccess(user);
    }, 700);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setErrorMsg("");
    const validation = validateLeadFields({
      name,
      phone: signUpPhone,
      email: signUpEmail,
      requireName: true,
      requireEmail: true
    });
    if (!validation.valid) {
      setErrorMsg(validation.error);
      return;
    }
    submitLead({
      name,
      email: validation.cleanEmail,
      phone_number: validation.cleanPhone,
      preferred_degree: program ? [program] : [],
      form_name: "Student Sign Up Form"
    });
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: name,
        email: signUpEmail,
        phone: signUpPhone,
        enrolledCourse: program,
        applicationId: `OS-2026-${Math.floor(10000 + Math.random() * 90000)}`
      };
      setLoggedInUser(user);
      setSuccessMsg(`Account created successfully! Welcome, ${user.name}!`);
      if (onLoginSuccess) onLoginSuccess(user);
    }, 750);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setErrorMsg("");
    setTimeout(() => {
      setIsLoading(false);
      const user = {
        name: "Aditya Shah",
        email: "student@onlinesiksha.com",
        phone: "+91 98765 43210",
        enrolledCourse: "Online MBA - Lovely Professional University",
        applicationId: "OS-2026-89421"
      };
      setLoggedInUser(user);
      setSuccessMsg("Authenticated via Google. Welcome!");
      if (onLoginSuccess) onLoginSuccess(user);
    }, 650);
  };

  const handleModalClose = () => {
    setErrorMsg("");
    setSuccessMsg("");
    setIsSignUp(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200"
      onClick={handleModalClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Outer Card Container */}
      <div
        className={`auth-slider-card ${isSignUp ? "active" : ""} bg-white relative max-w-[780px] w-full min-h-[520px] max-h-[92dvh] overflow-y-auto md:overflow-hidden rounded-[28px] shadow-2xl flex flex-col md:block`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button (Desktop Only - Mobile has its own top bar close button) */}
        <button
          type="button"
          onClick={handleModalClose}
          className="hidden md:flex absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 items-center justify-center transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success Screen if Logged In */}
        {loggedInUser ? (
          <div className="absolute inset-0 bg-white z-50 flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center shadow-xs mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#000f22]">
              {successMsg || "Authentication Successful!"}
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm">
              Logged in as <strong className="text-slate-800">{loggedInUser.email}</strong>
            </p>
            {loggedInUser.applicationId && (
              <div className="mt-3 inline-block bg-[#eef4ff] border border-[#d5e3ff] text-[#115eaf] px-4 py-1.5 rounded-full text-xs font-bold">
                Student Application ID: {loggedInUser.applicationId}
              </div>
            )}
            <div className="mt-6 flex flex-col gap-2.5 w-full max-w-xs">
              <button
                type="button"
                onClick={handleModalClose}
                className="w-full py-3 rounded-xl bg-[#115eaf] hover:bg-[#000f22] text-white text-sm font-bold shadow-md transition-all cursor-pointer"
              >
                Continue to Portal
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoggedInUser(null);
                  setSuccessMsg("");
                }}
                className="text-xs text-slate-500 hover:text-rose-600 font-semibold py-1 cursor-pointer transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* ========================================================
                MOBILE NEUMORPHIC VIEW (Visible strictly on screens < 768px)
                Matches Pinterest pin: 1108378158347906539
                ======================================================== */}
            <div className="md:hidden flex flex-col w-full min-h-[580px] bg-gradient-to-b from-[#eaf0f8] via-[#f2f6fc] to-[#e8eef6] p-6 relative overflow-hidden select-none">
              {/* Soft decorative neumorphic 3D shapes in background */}
              <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full border-[10px] border-white/60 shadow-[8px_8px_20px_#cfd9e8,-8px_-8px_20px_#ffffff] pointer-events-none" />
              <div className="absolute top-16 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-white/80 to-blue-100/40 shadow-[6px_6px_16px_#cbd5e1,-6px_-6px_16px_#ffffff] pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full border-[14px] border-white/70 shadow-[10px_10px_24px_#cfd9e8,-10px_-10px_24px_#ffffff] pointer-events-none" />
              <div className="absolute bottom-20 -left-6 w-20 h-20 rounded-full bg-gradient-to-tr from-white/70 to-blue-50/50 shadow-[4px_4px_12px_#cbd5e1] pointer-events-none" />

              {/* Error Notification on Mobile */}
              {errorMsg && (
                <div className="mb-3 z-30 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                  <span className="text-rose-500 font-bold">⚠</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Top Bar: Close Button (left) & Sparkles Badge (right) */}
              <div className="flex items-center justify-between w-full mb-3 z-10">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="w-9 h-9 rounded-full bg-[#edf3fa] shadow-[4px_4px_8px_#cbd5e1,-4px_-4px_8px_#ffffff] border border-white/80 flex items-center justify-center text-slate-600 active:shadow-[inset_2px_2px_4px_#cbd5e1,inset_-2px_-2px_4px_#ffffff] transition-all cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="w-9 h-9 rounded-full bg-[#edf3fa] shadow-[4px_4px_8px_#cbd5e1,-4px_-4px_8px_#ffffff] border border-white/80 flex items-center justify-center text-[#115eaf]">
                  <Sparkles className="w-4 h-4 text-[#115eaf]" />
                </div>
              </div>

              {/* Logo: Centered Neumorphic Squircle Card */}
              <div className="flex flex-col items-center justify-center z-10 mb-3">
                <div className="w-20 h-20 rounded-[24px] bg-gradient-to-b from-white/95 to-[#e8eff8] shadow-[8px_8px_18px_#cfd9e8,-8px_-8px_18px_#ffffff] border border-white flex items-center justify-center p-3 relative">
                  {/* Glowing 3D Emblem with OnlineSiksha Brand Colors */}
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#115eaf] via-[#2563eb] to-[#60a5fa] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_8px_16px_rgba(17,94,175,0.3)] flex items-center justify-center">
                    <GraduationCap className="w-7 h-7 text-white drop-shadow-md" />
                  </div>
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-[#000f22] tracking-tight mt-2.5 mb-0">
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </h1>
                <p className="text-[11px] font-bold text-[#64748b] tracking-wider uppercase mt-0.5">
                  {isSignUp ? "New Student Registration" : "Sign in to Online Siksha"}
                </p>

                {/* Neumorphic Segmented Tab Switcher */}
                <div className="flex w-full max-w-[270px] p-1 mt-3 rounded-2xl bg-[#edf3fa] shadow-[inset_3px_3px_6px_#cbd5e1,inset_-3px_-3px_6px_#ffffff] border border-white/80">
                  <button
                    type="button"
                    onClick={() => { setIsSignUp(false); setErrorMsg(""); }}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      !isSignUp
                        ? "bg-gradient-to-r from-[#115eaf] to-[#2563eb] text-white shadow-[0_4px_10px_rgba(17,94,175,0.3)]"
                        : "text-[#64748b] hover:text-[#000f22]"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsSignUp(true); setErrorMsg(""); }}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      isSignUp
                        ? "bg-gradient-to-r from-[#115eaf] to-[#2563eb] text-white shadow-[0_4px_10px_rgba(17,94,175,0.3)]"
                        : "text-[#64748b] hover:text-[#000f22]"
                    }`}
                  >
                    Create Account
                  </button>
                </div>
              </div>

              {/* Form Inputs (Neumorphic Inset Pills) */}
              {!isSignUp ? (
                /* ----------------- SIGN IN FORM (MOBILE) ----------------- */
                <form onSubmit={handleSignIn} className="w-full flex flex-col gap-2.5 z-10">
                  {/* Email / Username Input */}
                  <div className="h-11 sm:h-12 w-full rounded-2xl bg-[#edf3fa] shadow-[inset_3px_3px_6px_#cbd5e1,inset_-3px_-3px_6px_#ffffff] border border-white/80 px-4 flex items-center gap-3">
                    <User className="w-4 h-4 text-[#64748b] shrink-0" />
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Username or Email"
                      className="w-full bg-transparent text-xs sm:text-sm text-[#000f22] font-medium placeholder:text-[#94a3b8] focus:outline-none"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="h-11 sm:h-12 w-full rounded-2xl bg-[#edf3fa] shadow-[inset_3px_3px_6px_#cbd5e1,inset_-3px_-3px_6px_#ffffff] border border-white/80 px-4 flex items-center gap-3">
                    <Lock className="w-4 h-4 text-[#64748b] shrink-0" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full bg-transparent text-xs sm:text-sm text-[#000f22] font-medium placeholder:text-[#94a3b8] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[#64748b] hover:text-[#000f22] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-[#64748b]" />}
                    </button>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between text-xs px-1 mt-0.5">
                    <label className="flex items-center gap-2 cursor-pointer text-[#475569] font-medium">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-3.5 h-3.5 rounded-md accent-[#115eaf] cursor-pointer"
                      />
                      <span>Remember Me</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => alert("Password reset link sent to your registered email.")}
                      className="text-[#115eaf] font-bold hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  {/* Login Button with Embedded Arrow */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="h-11 sm:h-12 w-full rounded-2xl bg-gradient-to-r from-[#115eaf] via-[#1d63cb] to-[#2563eb] text-white font-bold text-sm shadow-[0_10px_24px_rgba(17,94,175,0.38)] flex items-center justify-center relative active:scale-[0.98] transition-all cursor-pointer mt-1"
                  >
                    <span>{isLoading ? "Signing in..." : "Login"}</span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center absolute right-2.5">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </button>


                </form>
              ) : (
                /* ----------------- SIGN UP FORM (MOBILE) ----------------- */
                <form onSubmit={handleSignUp} className="w-full flex flex-col gap-2.5 z-10">
                  {/* Full Name */}
                  <div className="h-11 sm:h-12 w-full rounded-2xl bg-[#edf3fa] shadow-[inset_3px_3px_6px_#cbd5e1,inset_-3px_-3px_6px_#ffffff] border border-white/80 px-4 flex items-center gap-3">
                    <User className="w-4 h-4 text-[#64748b] shrink-0" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full Legal Name"
                      className="w-full bg-transparent text-xs sm:text-sm text-[#000f22] font-medium placeholder:text-[#94a3b8] focus:outline-none"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="h-11 sm:h-12 w-full rounded-2xl bg-[#edf3fa] shadow-[inset_3px_3px_6px_#cbd5e1,inset_-3px_-3px_6px_#ffffff] border border-white/80 px-4 flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#64748b] shrink-0" />
                    <input
                      type="email"
                      required
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="Email Address"
                      className="w-full bg-transparent text-xs sm:text-sm text-[#000f22] font-medium placeholder:text-[#94a3b8] focus:outline-none"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="h-11 sm:h-12 w-full rounded-2xl bg-[#edf3fa] shadow-[inset_3px_3px_6px_#cbd5e1,inset_-3px_-3px_6px_#ffffff] border border-white/80 px-4 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#64748b] shrink-0" />
                    <span className="text-xs font-bold text-[#000f22] shrink-0">+91</span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      pattern={INDIAN_PHONE_PATTERN}
                      title="10-digit Indian mobile number starting with 6, 7, 8, 9, or 2"
                      required
                      value={signUpPhone}
                      onChange={(e) => setSignUpPhone(sanitizeIndianPhone(e.target.value))}
                      placeholder="10-digit mobile number"
                      className="w-full bg-transparent text-xs sm:text-sm text-[#000f22] font-medium placeholder:text-[#94a3b8] focus:outline-none"
                    />
                  </div>

                  {/* Target Degree */}
                  <div className="h-11 sm:h-12 w-full rounded-2xl bg-[#edf3fa] shadow-[inset_3px_3px_6px_#cbd5e1,inset_-3px_-3px_6px_#ffffff] border border-white/80 px-4 flex items-center gap-3 relative">
                    <GraduationCap className="w-4 h-4 text-[#64748b] shrink-0" />
                    <select
                      value={program}
                      onChange={(e) => setProgram(e.target.value)}
                      className="w-full bg-transparent text-xs sm:text-sm text-[#000f22] font-medium focus:outline-none appearance-none cursor-pointer pr-6"
                    >
                      <option value="Online MBA">Online MBA</option>
                      <option value="Online MCA">Online MCA</option>
                      <option value="Online BCA">Online BCA</option>
                      <option value="Online BBA">Online BBA</option>
                      <option value="Online M.Sc">Online M.Sc Data Science</option>
                      <option value="Online B.Com">Online B.Com</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#64748b] pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
                  </div>

                  {/* Register Button with Embedded Arrow */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="h-11 sm:h-12 w-full rounded-2xl bg-gradient-to-r from-[#115eaf] via-[#1d63cb] to-[#2563eb] text-white font-bold text-sm shadow-[0_10px_24px_rgba(17,94,175,0.38)] flex items-center justify-center relative active:scale-[0.98] transition-all cursor-pointer mt-1"
                  >
                    <span>{isLoading ? "Creating Account..." : "Register & Start"}</span>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center absolute right-2.5">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </button>


                </form>
              )}

              {/* Divider: OR CONTINUE WITH */}
              <div className="flex items-center gap-3 my-4 z-10">
                <div className="flex-1 h-px bg-[#cbd5e1]" />
                <span className="text-[10px] font-bold tracking-widest text-[#64748b] uppercase">
                  or continue with
                </span>
                <div className="flex-1 h-px bg-[#cbd5e1]" />
              </div>

              {/* Neumorphic Social Buttons */}
              <div className="flex items-center justify-center gap-4 z-10">
                {/* Google */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="w-13 h-13 rounded-2xl bg-gradient-to-b from-white to-[#edf3fa] shadow-[5px_5px_12px_#cbd5e1,-5px_-5px_12px_#ffffff] border border-white/80 flex items-center justify-center active:shadow-[inset_2px_2px_4px_#cbd5e1] active:scale-95 transition-all cursor-pointer"
                  title="Google"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </button>

                {/* Demo Student Fast Login */}
                <button
                  type="button"
                  onClick={() => { setEmail("student@onlinesiksha.com"); setPassword("••••••••"); }}
                  className="w-13 h-13 rounded-2xl bg-gradient-to-b from-white to-[#edf3fa] shadow-[5px_5px_12px_#cbd5e1,-5px_-5px_12px_#ffffff] border border-white/80 flex items-center justify-center active:shadow-[inset_2px_2px_4px_#cbd5e1] active:scale-95 transition-all cursor-pointer text-[#115eaf]"
                  title="Demo Student"
                >
                  <LogIn className="w-5 h-5 text-[#115eaf]" />
                </button>

                {/* UGC Verified Badge */}
                <button
                  type="button"
                  className="w-13 h-13 rounded-2xl bg-gradient-to-b from-white to-[#edf3fa] shadow-[5px_5px_12px_#cbd5e1,-5px_-5px_12px_#ffffff] border border-white/80 flex items-center justify-center active:shadow-[inset_2px_2px_4px_#cbd5e1] active:scale-95 transition-all cursor-pointer text-emerald-600"
                  title="Verified Portal"
                >
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </button>
              </div>

              {/* Tagline footer matching Pinterest design */}
              <div className="mt-5 pt-2 text-center z-10 flex flex-col items-center gap-1">
                <span className="text-[10px] font-black tracking-widest text-[#64748b] uppercase">
                  LEARN &nbsp;•&nbsp; GROW &nbsp;•&nbsp; EXCEL TOGETHER
                </span>
                <span className="text-[9.5px] font-semibold text-[#115eaf]/70 uppercase tracking-wider">
                  ONLINE SIKSHA PORTAL
                </span>
              </div>
            </div>

            {/* Error Notification on Desktop */}
            {errorMsg && (
              <div className="hidden md:flex absolute top-14 left-10 z-30 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium items-center gap-2 animate-fadeIn w-[320px]">
                <span className="text-rose-500 font-bold">⚠</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* ========================================================
                1. Sign In Form Panel (Desktop Only)
                ======================================================== */}
            <div
              className={`hidden md:flex auth-form-panel auth-sign-in flex-col justify-center items-center px-8 md:px-11 py-8 h-full ${
                isSignUp ? "hidden" : "flex"
              }`}
            >
              <form onSubmit={handleSignIn} className="w-full flex flex-col items-center text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#000f22] tracking-tight">
                  Sign In
                </h2>

                {/* Social Login Icons Row */}
                <div className="flex items-center gap-2.5 my-3.5">
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    className="w-10 h-10 rounded-xl border border-slate-200 hover:border-[#115eaf] hover:bg-[#eef4ff]/50 flex items-center justify-center transition-all cursor-pointer shadow-2xs group"
                    title="Continue with Google"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmail("student@onlinesiksha.com")}
                    className="w-10 h-10 rounded-xl border border-slate-200 hover:border-[#115eaf] hover:bg-[#eef4ff]/50 flex items-center justify-center transition-all cursor-pointer shadow-2xs text-[#115eaf]"
                    title="Quick Demo Login"
                  >
                    <LogIn className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-xl border border-slate-200 hover:border-[#115eaf] hover:bg-[#eef4ff]/50 flex items-center justify-center transition-all cursor-pointer shadow-2xs text-emerald-600"
                    title="UGC Verified Portal"
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs text-slate-400 font-medium mb-3">
                  or use your email password
                </span>

                {/* Email Input */}
                <div className="w-full relative mb-2.5">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email or Mobile Number"
                    className="w-full h-11 pl-10 pr-3 text-xs sm:text-sm bg-[#f4f8fe] border border-slate-200/90 rounded-xl focus:bg-white focus:outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/15 transition-all text-[#000f22]"
                  />
                </div>

                {/* Password Input */}
                <div className="w-full relative mb-1.5">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full h-11 pl-10 pr-10 text-xs sm:text-sm bg-[#f4f8fe] border border-slate-200/90 rounded-xl focus:bg-white focus:outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/15 transition-all text-[#000f22]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Forgot Password */}
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    setErrorMsg("Password reset dispatched to your email.");
                  }}
                  className="text-xs text-[#115eaf] hover:underline font-semibold my-2.5"
                >
                  Forgot Your Password?
                </a>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-1 w-auto min-w-[170px] px-8 py-2.5 rounded-xl bg-[#115eaf] hover:bg-[#000f22] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-[#115eaf]/25 active:scale-[0.98] cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? "Signing In..." : "SIGN IN"}
                </button>
              </form>
            </div>

            {/* ========================================================
                2. Sign Up Form Panel (Desktop Only - Hidden on Mobile!)
                ======================================================== */}
            <div
              className="hidden md:flex auth-form-panel auth-sign-up flex-col justify-center items-center px-8 md:px-11 py-6 h-full"
            >
              <form onSubmit={handleSignUp} className="w-full flex flex-col items-center text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#000f22] tracking-tight">
                  Create Account
                </h2>

                {/* Social Login Icons Row */}
                <div className="flex items-center gap-2.5 my-3">
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    className="w-10 h-10 rounded-xl border border-slate-200 hover:border-[#115eaf] hover:bg-[#eef4ff]/50 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                    title="Sign up with Google"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-xl border border-slate-200 hover:border-[#115eaf] hover:bg-[#eef4ff]/50 flex items-center justify-center transition-all cursor-pointer shadow-2xs text-[#115eaf]"
                    title="Direct Admission Portal"
                  >
                    <GraduationCap className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs text-slate-400 font-medium mb-2.5">
                  or use your email for registration
                </span>

                {/* Name */}
                <div className="w-full relative mb-2">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Legal Name"
                    className="w-full h-10 pl-10 pr-3 text-xs sm:text-sm bg-[#f4f8fe] border border-slate-200/90 rounded-xl focus:bg-white focus:outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/15 transition-all text-[#000f22]"
                  />
                </div>

                {/* Email */}
                <div className="w-full relative mb-2">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full h-10 pl-10 pr-3 text-xs sm:text-sm bg-[#f4f8fe] border border-slate-200/90 rounded-xl focus:bg-white focus:outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/15 transition-all text-[#000f22]"
                  />
                </div>

                {/* Mobile */}
                <div className="w-full relative mb-2 flex items-center">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-xs font-bold gap-1.5">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>+91</span>
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    pattern={INDIAN_PHONE_PATTERN}
                    title="10-digit Indian mobile number starting with 6, 7, 8, 9, or 2"
                    required
                    value={signUpPhone}
                    onChange={(e) => setSignUpPhone(sanitizeIndianPhone(e.target.value))}
                    placeholder="10-digit mobile number"
                    className="w-full h-10 pl-16 pr-3 text-xs sm:text-sm bg-[#f4f8fe] border border-slate-200/90 rounded-xl focus:bg-white focus:outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/15 transition-all text-[#000f22]"
                  />
                </div>

                {/* Intended Program Selector */}
                <div className="w-full relative mb-3">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full h-10 pl-10 pr-8 text-xs sm:text-sm bg-[#f4f8fe] border border-slate-200/90 rounded-xl focus:bg-white focus:outline-none focus:border-[#115eaf] focus:ring-2 focus:ring-[#115eaf]/15 transition-all text-[#000f22] cursor-pointer appearance-none"
                  >
                    <option value="Online MBA">Online MBA</option>
                    <option value="Online MCA">Online MCA</option>
                    <option value="Online BCA">Online BCA</option>
                    <option value="Online BBA">Online BBA</option>
                    <option value="Online M.Sc">Online M.Sc Data Science</option>
                    <option value="Online B.Com">Online B.Com</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-auto min-w-[170px] px-8 py-2.5 rounded-xl bg-[#115eaf] hover:bg-[#000f22] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-[#115eaf]/25 active:scale-[0.98] cursor-pointer disabled:opacity-60"
                >
                  {isLoading ? "Creating..." : "SIGN UP"}
                </button>
              </form>
            </div>

            {/* ========================================================
                3. Sliding Curved Overlay (Desktop Only >= 768px)
                ======================================================== */}
            <div className="hidden md:block auth-toggle-container">
              <div className="auth-toggle">
                {/* Left Toggle Panel (Shown when on Sign Up mode) */}
                <div className="auth-toggle-panel auth-toggle-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-[11px] font-semibold mb-3 border border-white/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-200" />
                    <span>OnlineSiksha Admissions</span>
                  </div>
                  <h3 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                    Welcome Back!
                  </h3>
                  <p className="text-xs text-blue-100/90 leading-relaxed max-w-[240px] mb-6">
                    To keep connected with your counselor desk &amp; verified application, please sign in.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(false);
                      setErrorMsg("");
                    }}
                    className="border-2 border-white text-white hover:bg-white hover:text-[#115eaf] text-xs font-bold tracking-wider uppercase px-9 py-2.5 rounded-xl transition-all cursor-pointer active:scale-[0.98]"
                  >
                    SIGN IN
                  </button>
                </div>

                {/* Right Toggle Panel (Shown when on Sign In mode) */}
                <div className="auth-toggle-panel auth-toggle-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-blue-100 text-[11px] font-semibold mb-3 border border-white/20">
                    <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                    <span>Join 50,000+ Students</span>
                  </div>
                  <h3 className="text-3xl font-extrabold text-white tracking-tight mb-2">
                    Hello, Student!
                  </h3>
                  <p className="text-xs text-blue-100/90 leading-relaxed max-w-[240px] mb-6">
                    Register with your personal details to compare 100+ UGC degrees with 0% interest EMI.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(true);
                      setErrorMsg("");
                    }}
                    className="border-2 border-white text-white hover:bg-white hover:text-[#115eaf] text-xs font-bold tracking-wider uppercase px-9 py-2.5 rounded-xl transition-all cursor-pointer active:scale-[0.98]"
                  >
                    SIGN UP
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
