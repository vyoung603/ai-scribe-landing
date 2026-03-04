import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem } from '../lib/animations'

const proofStats = [
  { value: '6,000+', label: 'therapists on SonderMind' },
  { value: '3 yrs', label: 'clinical AI R&D' },
  { value: '10M+', label: 'sessions informed' },
]

export function Testimonial() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Gradient background -- warm to differentiate from sage sections */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest via-[#4845D9] to-[#3B2FA0]" />
      {/* Decorative glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_30%_20%,_rgba(240,237,255,0.1)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_80%,_rgba(255,140,66,0.06)_0%,_transparent_60%)]" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={staggerContainer}
        className="relative z-10 section-container"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            variants={fadeInUp}
            className="text-sm font-semibold text-white/40 uppercase tracking-[0.25em] mb-8"
          >
            From the field
          </motion.p>

          <motion.div variants={fadeInUp}>
            {/* Large quotation mark */}
            <svg width="56" height="42" viewBox="0 0 32 24" className="mx-auto mb-10 text-white/15">
              <path d="M0 24V14.4C0 6.08 4.48 1.28 13.44 0l1.28 3.52C9.28 4.8 7.04 8 6.72 12H12.8V24H0zm18.56 0V14.4C18.56 6.08 23.04 1.28 32 0l1.28 3.52c-5.44 1.28-7.68 4.48-8 8h6.08V24H18.56z" fill="currentColor" />
            </svg>

            <blockquote className="font-serif text-3xl sm:text-4xl lg:text-[2.8rem] text-white leading-[1.2] mb-12 max-w-3xl mx-auto">
              I could easily see 20 clients a week now without adding hours to my schedule.
            </blockquote>

            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-white/20 to-white/5 ring-2 ring-white/10 flex items-center justify-center text-white font-semibold text-lg backdrop-blur-sm">
                DR
              </div>
              <div className="text-left">
                <div className="text-base font-medium text-white/90">Dr. Rebecca M., LCSW</div>
                <div className="text-sm text-white/40">SonderMind AI Scribe Pilot &middot; Denver, CO</div>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/15 to-transparent my-10" />

          {/* Proof stats */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-3 gap-8 max-w-xl mx-auto"
          >
            {proofStats.map((stat) => (
              <motion.div key={stat.label} variants={staggerItem} className="text-center">
                <div className="font-serif text-3xl sm:text-4xl text-white mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
