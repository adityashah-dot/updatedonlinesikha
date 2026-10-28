import React from 'react'
import './HomeHero.css'

const asset = (name) => `/images/${name}`

const benefits = [
  { icon: 'check', title: '100% Free', detail: 'Counselling', tone: 'green' },
  { icon: 'shield', title: 'Zero Spam', detail: '& Complete Privacy', tone: 'yellow' },
  { icon: 'users', title: 'Guidance by', detail: 'Verified Experts', tone: 'purple' },
]

export default function HomeHero() {
  return (
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
            <a href="/counselling" className="button button-secondary">
              <img src={asset('Vector.svg')} alt="" />
              Talk to an Expert
            </a>
          </div>

          <div className="benefits">
            {benefits.map((benefit) => (
              <div className="benefit" key={benefit.title}>
                <span className={`benefit-icon ${benefit.tone}`}>
                  {benefit.icon === 'check' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>}
                  {benefit.icon === 'shield' && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M8.6 12.2l2.4 2.4 4.4-4.6" /></svg>}
                  {benefit.icon === 'users' && <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="8" r="3.6" /><path d="M2 19.5c0-3.6 3.1-5.8 7-5.8s7 2.2 7 5.8z" /><circle cx="17.2" cy="9" r="2.7" /><path d="M16.6 13.5c3 0 5.4 1.8 5.4 4.8v1.2h-4.4c0-2.2-.8-4-2.3-5.2.4-.5.8-.8 1.3-.8z" /></svg>}
                </span>
                <span>
                  <strong>{benefit.title}</strong>
                  <small>{benefit.detail}</small>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="visual" aria-label="Student exploring online degrees">
          <div className="stage">
            <div className="portrait-circle" />
            <img className="student" src={asset('studentfigmaimg.png')} alt="Student holding books" />
            <div className="stat-card universities-card">
              <span className="stat-icon blue">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l11 6 9-4.9V17h2V9L12 3z" /><path d="M5 13.2v4L12 21l7-3.8v-4L12 17l-7-3.8z" /></svg>
              </span>
              <span><strong>50+</strong><small>Top Universities</small></span>
            </div>
            <div className="stat-card students-card">
              <span className="stat-icon green">
                <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="8" r="3.6" /><path d="M2 19.5c0-3.6 3.1-5.8 7-5.8s7 2.2 7 5.8z" /><circle cx="17.2" cy="9" r="2.7" /><path d="M16.6 13.5c3 0 5.4 1.8 5.4 4.8v1.2h-4.4c0-2.2-.8-4-2.3-5.2.4-.5.8-.8 1.3-.8z" /></svg>
              </span>
              <span><strong>5,00,000+</strong><small>Students Guided</small></span>
            </div>
            <svg className="arrow" viewBox="0 0 62 114" fill="none" stroke="#1f6fe0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M44 4 C 6 22, -4 78, 52 106" stroke-dasharray="6 6"/>
              <path d="M34 2 L45 4 L38 14"/>
              <path d="M42 98 L53 107 L40 112"/>
            </svg>
            <svg className="sparks" viewBox="0 0 46 52" fill="none" stroke="#1f6fe0" stroke-width="3" stroke-linecap="round" aria-hidden="true">
              <path d="M3 34 L12 4"/>
              <path d="M17 30 L33 10"/>
              <path d="M24 44 L44 36"/>
            </svg>
          </div>
        </div>
      </div>
      </section>
  )
}