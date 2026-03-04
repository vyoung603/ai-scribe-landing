import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeInUp, easeCubic } from '../lib/animations'

const roles = ['therapists', 'psychologists', 'counselors', 'clinical social workers']

const stats = [
  { value: '100%', label: 'client satisfaction with session takeaways' },
  { value: '99%', label: 'client consent rate for AI-assisted notes' },
  { value: '90 min', label: 'saved daily per provider' },
  { value: '67%', label: 'more sessions completed with AI tools' },
]

interface HeroProps {
  onOpenModal: () => void
}

export function Hero({ onOpenModal }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  // Parallax: image moves slower than scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 40])

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={sectionRef} className="relative pt-20 sm:pt-28 lg:pt-36 pb-0 overflow-hidden">
      {/* Multi-layer gradient mesh */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,_rgba(87,84,255,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_20%,_rgba(240,237,255,0.6)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_30%_50%_at_10%_60%,_rgba(255,140,66,0.04)_0%,_transparent_60%)]" />
      </div>

      <div className="relative z-10 section-container">
        <div className="grid lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
          {/* Left: Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
            }}
          >
            {/* Badge with rotating audience */}
            <motion.div variants={fadeInUp} className="mb-8">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-sage/60 backdrop-blur-sm rounded-full border border-sage-dark/20">
                <span className="text-sm text-ink-muted">For</span>
                <span className="relative inline-flex items-center h-5 overflow-hidden w-[170px] sm:w-[185px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={roles[roleIndex]}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.3, ease: easeCubic }}
                      className="absolute left-0 text-sm font-semibold text-forest whitespace-nowrap"
                    >
                      {roles[roleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <div className="w-px h-4 bg-sage-dark/20" />
                <div className="w-2 h-2 bg-forest rounded-full animate-pulse" />
                <span className="text-sm text-ink-muted tracking-wide">
                  SonderMind clinical AI
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-serif text-4xl sm:text-5xl lg:text-[3.8rem] xl:text-[4.2rem] text-forest leading-[1.08] tracking-tight mb-7"
            >
              Your notes are done
              <br />
              <span className="bg-gradient-to-r from-forest via-forest-light to-[#9B8FFF] bg-clip-text text-transparent">
                before you leave the office.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-ink-light max-w-lg leading-relaxed mb-10"
            >
              AI Scribe listens to your sessions and writes therapy-fluent clinical documentation so your evenings belong to you, not your EHR.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col items-start">
              <button
                onClick={onOpenModal}
                className="group relative inline-flex items-center gap-4 px-10 py-5 bg-warm-accent text-white text-lg font-semibold rounded-2xl hover:bg-[#FF9F5C] transition-all duration-300 hover:shadow-[0_20px_60px_-15px_rgba(255,140,66,0.4)] hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Join the Waitlist
                <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <p className="text-sm text-ink-muted mt-3">
                Free tier available for waitlist partners. No credit card required.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Image with glow + parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: easeCubic, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            {/* Glow behind image -- parallax (slower) */}
            <motion.div
              style={{ y: glowY }}
              className="absolute -inset-8 bg-gradient-to-br from-forest/20 via-sage/40 to-transparent rounded-[3rem] blur-3xl"
            />
            {/* Image container -- parallax */}
            <motion.div
              style={{ y: imageY }}
              className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(87,84,255,0.25)] ring-1 ring-white/20"
            >
              <video
                src={`${import.meta.env.BASE_URL}hero-therapist.mp4`}
                poster={`${import.meta.env.BASE_URL}hero-therapist.png`}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/30 via-transparent to-white/5" />
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile hero image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:hidden mt-12 -mx-6 sm:-mx-12"
        >
          <div className="relative h-64 sm:h-80 overflow-hidden">
            <video
              src={`${import.meta.env.BASE_URL}hero-therapist.mp4`}
              poster={`${import.meta.env.BASE_URL}hero-therapist.png`}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/30 to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Stats bar -- visually separated with gradient border */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6, ease: easeCubic }}
        className="relative z-10 mt-12 lg:mt-16"
      >
        <div className="h-px bg-gradient-to-r from-transparent via-sage-dark/30 to-transparent" />
        <div className="bg-gradient-to-b from-sage/30 to-cream py-8">
          <div className="section-container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-serif text-3xl sm:text-4xl lg:text-[2.8rem] text-forest tracking-tight mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-ink-muted leading-snug max-w-[180px] mx-auto">{stat.label}</div>
                </div>
              ))}
            </div>
            <p className="text-center text-ink-muted/50 text-xs mt-6 tracking-widest uppercase">
              Based on SonderMind AI data
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
