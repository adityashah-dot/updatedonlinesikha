import React from 'react'
import './HomeHero.css'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Headphones, Check, Shield, Users, Phone, Building2 } from 'lucide-react'

const asset = (name) => `/images/${name}`

export default function HomeHero({ onOpenHelpDesk } = {}) {
  const [toastMessage, setToastMessage] = React.useState(null);

  const showMessage = (text) => {
    setToastMessage(text);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.4 + i * 0.1, duration: 0.6, ease: 'easeOut' }
    })
  };

  const floatingBadgeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.8 + i * 0.2, duration: 0.5, type: 'spring', stiffness: 200, damping: 10 }
    })
  };

  return (
    <>
      {/* Mobile-only hero (new design) */}
      <div className="md:hidden min-h-screen bg-slate-50 font-sans relative overflow-hidden -mt-5 -mx-1">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 border-[60px] border-blue-200 rounded-full pointer-events-none"
          animate={{ rotate: [0, 90, 180, 90, 0], x: [0, 20, 40, 20, 0], y: [0, -20, -40, -20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute -left-40 bottom-20 w-60 h-60 border-[30px] border-emerald-100 rounded-full pointer-events-none opacity-50" />


        <main className="relative z-10 max-w-md mx-auto text-center px-4 pt-0">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 shadow-inner mb-5"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-semibold text-emerald-900 tracking-tight">
              UGC-Entitled <span className="text-emerald-300 font-normal px-0.5">|</span> 100% Online <span className="text-emerald-300 font-normal px-0.5">|</span> Zero-Cost Counselling
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            className="text-[40px] font-extrabold text-slate-950 tracking-tighter leading-tight mb-3"
          >
            India’s Top <br />
            <span className="text-[#115eaf] relative inline-block">
              Online Degrees
              <svg className="absolute -bottom-2 left-0 w-full text-[#115eaf]" height="10" viewBox="0 0 150 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M3 7C42 2 108 2 147 8"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, duration: 1.5, ease: 'easeInOut' }}
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-slate-600 text-sm leading-relaxed max-w-sm mx-auto mb-8 px-4"
          >
            Compare 50+ online universities, explore programs, check fees, and get free expert guidance — all in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="w-full flex flex-col gap-4 mb-8"
          >
            <a
              href="/universities"
              className="w-full py-4 px-6 rounded-2xl bg-[#115eaf] hover:bg-[#084a8c] text-white font-bold text-base shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span className="text-xl">🔍</span>
              <span>Explore 50+ Universities</span>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}>
                →
              </motion.span>
            </a>

            <button
              type="button"
              onClick={onOpenHelpDesk}
              className="w-full py-4 px-6 rounded-2xl bg-white hover:bg-slate-50 text-[#115eaf] font-bold text-base border-2 border-blue-200 shadow-sm flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Headphones className="text-lg" />
              <span>Talk to an Expert</span>
            </button>
          </motion.div>

          <div className="grid grid-cols-3 gap-3 w-full mb-8 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 shadow-sm">
            {[
              { icon: Check, bg: 'bg-emerald-100', text: 'text-emerald-600', title: '100% Free', label: 'Counselling' },
              { icon: Shield, bg: 'bg-amber-100', text: 'text-amber-600', title: 'Zero Spam', label: '& Privacy' },
              { icon: Users, bg: 'bg-purple-100', text: 'text-purple-600', title: 'Verified', label: 'Experts' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                custom={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6, ease: 'easeOut' }}
                className="flex flex-col items-center text-center"
              >
                <div className={`w-11 h-11 rounded-full ${feature.bg} flex items-center justify-center ${feature.text} mb-2 shadow-inner`}>
                  <feature.icon className="text-sm" />
                </div>
                <span className="text-xs font-bold text-slate-900 leading-tight">{feature.title}</span>
                <span className="text-[11px] text-slate-500">{feature.label}</span>
              </motion.div>
            ))}
          </div>

          <div className="relative w-full flex justify-center items-center mt-6 mb-6">
            <div className="absolute -left-2 top-10 w-10 h-16 border-l-2 border-dashed border-blue-300 rounded-l-full" />
            <div className="relative w-56 h-56 rounded-full bg-gradient-to-tr from-amber-50 via-blue-50 to-emerald-50 p-2 shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white">
              <img src={asset('studentfigmaimg.png')} alt="Professional student" className="w-full h-full object-cover object-top rounded-full" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5, type: 'spring', stiffness: 200, damping: 10 }}
              className="absolute -bottom-3 -left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-xl border border-slate-100 flex items-center gap-2.5 transform rotate-[-8deg]"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-[#115eaf]">
                <GraduationCap className="text-sm" />
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-slate-950">50+</p>
                <p className="text-[10px] font-semibold text-slate-500 leading-none">Top Universities</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.5, type: 'spring', stiffness: 200, damping: 10 }}
              className="absolute -top-6 -right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-xl border border-slate-100 flex items-center gap-2.5 transform rotate-[5deg]"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Users className="text-sm" />
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-slate-950">5,00,000+</p>
                <p className="text-[10px] font-semibold text-emerald-700 leading-none">Students Guided</p>
              </div>
            </motion.div>
          </div>
        </main>

        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: 50, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: 50, x: '-50%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-xs px-6 py-3 rounded-2xl shadow-2xl z-[60] flex items-center gap-3 border border-slate-700"
            >
              <Check className="text-emerald-400 text-sm" />
              <span className="font-medium tracking-wide">{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop hero (unchanged) */}
      <div className="hidden md:block">
        <section className="hero" id="degrees">
          <img className="wave-background" src={asset('hero-waves.svg')} alt="" />
          <img className="accent-lines accent-tl" src={asset('SVG.svg')} alt="" />

          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="status-dot" />
                <span className="entitled">UGC-Entitled</span>
                <i>|</i><span>100% Online</span><i>|</i><span>Zero-Cost Counselling</span>
              </div>

              <h1>
                India’s Top <strong>Online Degrees</strong>
              </h1>
              <img className="underline" src={asset('image02.svg')} alt="" />
              <p className="intro">
                Compare 50+ online universities, explore programs, check fees,
                <br className="desktop-break" />
                {' '}and get free expert guidance — all in one place.
              </p>

              <div className="hero-actions">
                <a href="/universities" className="button button-primary">
                  <img src={asset('SVG.svg')} alt="" />
                  Explore 50+ Universities <span aria-hidden="true">→</span>
                </a>
                <a
                  href="/counselling"
                  onClick={(e) => {
                    if (onOpenHelpDesk) {
                      e.preventDefault();
                      onOpenHelpDesk();
                    }
                  }}
                  className="button button-secondary cursor-pointer"
                >
                  <img src={asset('Vector.svg')} alt="" />
                  Talk to an Expert
                </a>
              </div>

              <div className="benefits">
                <div className="benefit">
                  <span className="benefit-icon green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg></span>
                  <span><strong>100% Free</strong><small>Counselling</small></span>
                </div>
                <div className="benefit">
                  <span className="benefit-icon yellow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M8.6 12.2l2.4 2.4 4.4-4.6" /></svg></span>
                  <span><strong>Zero Spam</strong><small>& Complete Privacy</small></span>
                </div>
                <div className="benefit">
                  <span className="benefit-icon purple"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="8" r="3.6" /><path d="M2 19.5c0-3.6 3.1-5.8 7-5.8s7 2.2 7 5.8z" /><circle cx="17.2" cy="9" r="2.7" /><path d="M16.6 13.5c3 0 5.4 1.8 5.4 4.8v1.2h-4.4c0-2.2-.8-4-2.3-5.2.4-.5.8-.8 1.3-.8z" /></svg></span>
                  <span><strong>Guidance by</strong><small>Verified Experts</small></span>
                </div>
              </div>
            </div>

            <div className="visual" aria-label="Student exploring online degrees">
              <div className="stage">
                <div className="portrait-circle" />
                <img className="student" src={asset('studentfigmaimg.png')} alt="Student holding books" />
                <div className="stat-card universities-card">
                  <span className="stat-icon blue"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.9V17h2V9L12 3z" /><path d="M5 13.2v4L12 21l7-3.8v-4L12 17l-7-3.8z" /></svg></span>
                  <span><strong>50+</strong><small>Top Universities</small></span>
                </div>
                <div className="stat-card students-card">
                  <span className="stat-icon green"><svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="8" r="3.6" /><path d="M2 19.5c0-3.6 3.1-5.8 7-5.8s7 2.2 7 5.8z" /><circle cx="17.2" cy="9" r="2.7" /><path d="M16.6 13.5c3 0 5.4 1.8 5.4 4.8v1.2h-4.4c0-2.2-.8-4-2.3-5.2.4-.5.8-.8 1.3-.8z" /></svg></span>
                  <span><strong>5,00,000+</strong><small>Students Guided</small></span>
                </div>
                <svg className="arrow" viewBox="0 0 62 114" fill="none" stroke="#1f6fe0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M44 4 C 6 22, -4 78, 52 106" strokeDasharray="6 6"/>
                  <path d="M34 2 L45 4 L38 14"/>
                  <path d="M42 98 L53 107 L40 112"/>
                </svg>
                <svg className="sparks" viewBox="0 0 46 52" fill="none" stroke="#1f6fe0" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                  <path d="M3 34 L12 4"/>
                  <path d="M17 30 L33 10"/>
                  <path d="M24 44 L44 36"/>
                </svg>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
