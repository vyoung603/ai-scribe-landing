import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, staggerItem } from '../lib/animations'
import { ShieldCheck, Lock, UserCheck, FileCheck2 } from 'lucide-react'

const items = [
  {
    icon: ShieldCheck,
    title: 'HIPAA Compliant',
    description: 'Full HIPAA compliance with BAA agreements. Patient data protected by law.',
  },
  {
    icon: Lock,
    title: 'SOC 2 Type II Certified',
    description: 'Enterprise-grade security controls. Audited by independent third parties.',
  },
  {
    icon: UserCheck,
    title: 'Clinician Review Required',
    description: 'AI generates drafts. You review, edit, and sign. Humans always in the loop.',
  },
  {
    icon: FileCheck2,
    title: 'Business Associate Agreement',
    description: 'BAA included with every plan. Required for HIPAA-covered entities.',
  },
]

export function Security() {
  return (
    <section id="security" className="relative overflow-hidden">
      {/* Fade-in strip: light to dark */}
      <div className="h-24 bg-gradient-to-b from-cream to-[#1a1844]" />

      <div className="relative py-20 lg:py-28">
        {/* Rich dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1844] via-forest-dark to-[#0d0d1a]" />
        {/* Decorative gradient orbs */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_20%_30%,_rgba(87,84,255,0.15)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_40%_at_80%_70%,_rgba(87,84,255,0.1)_0%,_transparent_60%)]" />

        <div className="relative z-10 section-container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={fadeInUp}
          className="text-center mb-10"
        >
          <p className="text-sm font-semibold text-sage/25 uppercase tracking-[0.25em] mb-5">Security</p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.2rem] text-white leading-tight">
            Built for healthcare<br className="hidden sm:block" /> from day one
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={staggerContainer}
          className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto"
        >
          {items.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.title}
                variants={staggerItem}
                className="p-8 lg:p-10 rounded-3xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.1] hover:-translate-y-1 backdrop-blur-sm transition-all duration-300 ease-out"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-forest/30 to-forest-light/10 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-white/[0.08]">
                  <Icon size={26} className="text-sage/60" strokeWidth={1.7} />
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-base text-white/70 leading-relaxed">{item.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
        </div>
      </div>

      {/* Fade-out strip: dark to light */}
      <div className="h-24 bg-gradient-to-b from-[#0d0d1a] to-cream" />
    </section>
  )
}
