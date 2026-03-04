import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeInUp } from '../lib/animations'

interface BottomCTAProps {
  onOpenModal: () => void
}

export function BottomCTA({ onOpenModal }: BottomCTAProps) {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      <div className="relative z-10 section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeInUp}
          className="relative max-w-4xl mx-auto bg-gradient-to-br from-forest via-forest to-[#4845D9] rounded-[2rem] p-10 sm:p-12 lg:p-16 text-center overflow-hidden"
        >
          {/* Decorative orbs */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_20%,_rgba(240,237,255,0.08)_0%,_transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_30%_at_80%_80%,_rgba(255,140,66,0.06)_0%,_transparent_60%)]" />

          <div className="relative z-10">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[3rem] text-white leading-tight mb-5">
              Stop taking notes<br className="hidden sm:block" /> home tonight.
            </h2>
            <p className="text-lg text-sage/50 mb-10 max-w-xl mx-auto leading-relaxed">
              Join the waitlist for early access and free onboarding when we launch.
            </p>
            <button
              onClick={onOpenModal}
              className="group inline-flex items-center gap-3 px-12 py-5 bg-warm-accent text-white text-lg font-semibold rounded-2xl hover:bg-[#FF9F5C] transition-all duration-300 shadow-[0_20px_60px_-15px_rgba(255,140,66,0.4)] hover:shadow-[0_25px_70px_-15px_rgba(255,140,66,0.5)] hover:-translate-y-0.5 active:scale-[0.98]"
            >
              Join the Waitlist
              <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <p className="text-xs text-white/35 mt-5">Early access spots are limited. No credit card required.</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
