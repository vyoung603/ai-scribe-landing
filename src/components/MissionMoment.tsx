import { motion } from 'framer-motion'
import { fadeInUp } from '../lib/animations'

export function MissionMoment() {
  return (
    <section id="mission" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Subtle sage gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-sage/20 to-cream" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_rgba(87,84,255,0.03)_0%,_transparent_60%)]" />

      <div className="relative z-10 section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeInUp}
          className="max-w-3xl mx-auto"
        >
          <p className="text-sm font-semibold text-forest/40 uppercase tracking-[0.25em] mb-8">Our Mission</p>

          <div className="border-l-[3px] border-forest/30 pl-8">
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.2rem] text-forest leading-snug mb-8">
              Documentation is the tax therapists pay for doing their job. We're eliminating it.
            </h2>
            <p className="text-lg sm:text-xl text-ink-light leading-relaxed max-w-2xl">
              SonderMind has spent a decade building technology for mental health providers. AI Scribe is the result of watching thousands of clinicians lose their evenings to paperwork -- and deciding that the technology finally exists to fix it.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
