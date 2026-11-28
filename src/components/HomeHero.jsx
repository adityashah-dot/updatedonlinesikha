import './HomeHero.css'
import { GraduationCap, Headphones, Check, Shield, Users, Search, Building2 } from 'lucide-react'

const asset = (name) => `/images/${name}`

export default function HomeHero({ onOpenHelpDesk } = {}) {
  return (
    <>
      {/* Mobile hero */}
      <div className="md:hidden pb-8 bg-gradient-to-b from-white to-canvas border-b border-line relative -mt-4 sm:-mt-5 -mx-3.5 sm:-mx-4">
        <main className="max-w-md mx-auto text-center px-5 pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-line mb-5">
            <span className="h-2 w-2 rounded-full bg-success-600" />
            <span className="text-xs font-medium text-ink-500">
              <span className="text-success-600 font-semibold">UGC-Entitled</span> · 100% Online · Free Counselling
            </span>
          </div>

          <h1 className="font-display text-[34px] font-bold text-ink-900 tracking-[-0.025em] leading-[1.1] mb-3">
            India’s Top <span className="text-brand-600 block">Online Degrees</span>
          </h1>

          <p className="text-ink-500 text-[15px] leading-relaxed max-w-sm mx-auto mb-6">
            Compare 50+ online universities, explore programs, check fees, and get free expert guidance — all in one place.
          </p>

          <div className="w-full flex flex-col gap-2.5 mb-6">
            <a
              href="/universities"
              className="w-full h-12 px-5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold text-[15px] flex items-center justify-center gap-2 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>Explore 50+ Universities</span>
            </a>
            <button
              type="button"
              onClick={onOpenHelpDesk}
              className="w-full h-12 px-5 rounded-lg bg-white text-ink-900 font-semibold text-[15px] border border-line-strong flex items-center justify-center gap-2 transition-colors hover:border-brand-600 hover:text-brand-600"
            >
              <Headphones className="w-4 h-4" />
              <span>Talk to an Expert</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full py-4 border-y border-line">
            {[
              { icon: Check, title: 'Free', label: 'Counselling' },
              { icon: Shield, title: 'No Spam', label: 'Privacy first' },
              { icon: Users, title: 'Expert', label: 'Advisors' }
            ].map((feature) => (
              <div key={feature.title} className="flex flex-col items-center text-center">
                <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mb-1.5">
                  <feature.icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-ink-900 leading-tight">{feature.title}</span>
                <span className="text-[11px] text-ink-500 mt-0.5">{feature.label}</span>
              </div>
            ))}
          </div>

          <div className="relative w-full flex justify-center items-center mt-8">
            <div className="relative w-56 h-56 rounded-full bg-brand-100 overflow-hidden">
              <img src={asset('studentfigmaimg.webp')} alt="Student holding books" width="780" height="911" fetchPriority="high" decoding="async" className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[80%] h-auto object-contain" />
            </div>
            <div className="absolute bottom-2 left-0 bg-white px-3 py-2 rounded-xl shadow-lg border border-line flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-ink-900 leading-tight">50+</p>
                <p className="text-[11px] text-ink-500 leading-tight">Universities</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Desktop hero */}
      <div className="hidden md:block">
        <section className="hero" id="hero">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="status-dot" />
                <span className="entitled">UGC-Entitled</span>
                <i>·</i><span>100% Online</span><i>·</i><span>Free Counselling</span>
              </div>

              <h1>
                India’s Top <strong>Online Degrees</strong>
              </h1>
              <p className="intro">
                Compare 50+ online universities, explore programs, check fees,
                <br className="desktop-break" />
                {' '}and get free expert guidance — all in one place.
              </p>

              <div className="hero-actions">
                <a href="/universities" className="button button-primary">
                  <Search aria-hidden="true" />
                  Explore 50+ Universities
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
                  <Headphones aria-hidden="true" />
                  Talk to an Expert
                </a>
              </div>

              <div className="benefits">
                <div className="benefit">
                  <span className="benefit-icon"><Check /></span>
                  <span><strong>Free counselling</strong><small>No hidden charges</small></span>
                </div>
                <div className="benefit">
                  <span className="benefit-icon"><Shield /></span>
                  <span><strong>No spam</strong><small>Your data stays private</small></span>
                </div>
                <div className="benefit">
                  <span className="benefit-icon"><Users /></span>
                  <span><strong>Expert advisors</strong><small>One-on-one guidance</small></span>
                </div>
              </div>
            </div>

            <div className="visual" aria-label="Student exploring online degrees">
              <div className="stage">
                <div className="portrait-circle" />
                <img className="student" src={asset('studentfigmaimg.webp')} alt="Student holding books" width="780" height="911" fetchPriority="high" decoding="async" />
                <div className="stat-card universities-card">
                  <span className="stat-icon"><GraduationCap /></span>
                  <span><strong>50+</strong><small>Universities</small></span>
                </div>
                <div className="stat-card students-card">
                  <span className="stat-icon"><Building2 /></span>
                  <span><strong>UGC-DEB</strong><small>Entitled programs only</small></span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
