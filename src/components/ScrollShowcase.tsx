import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { Clock, FileWarning, CheckCircle2, Sparkles, FileText, Mic } from 'lucide-react'
import { staggerContainer, staggerItem } from '../lib/animations'

export function ScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const scrollProgress = useMotionValue(0)

  useEffect(() => {
    const check = () => setIsLargeScreen(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Manual scroll progress -- scoped to container
  const updateProgress = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight
    const scrollRange = rect.height - vh
    const progress = Math.max(0, Math.min(1, -rect.top / scrollRange))
    scrollProgress.set(progress)
  }, [scrollProgress])

  useEffect(() => {
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [updateProgress])

  // Crossfade: problem holds fully, fades out around midpoint; solution fades in
  const problemOpacity = useTransform(scrollProgress, [0.40, 0.50], [1, 0])
  const solutionOpacity = useTransform(scrollProgress, [0.50, 0.60], [0, 1])

  // Background color transitions cream → sage
  const bgColor = useTransform(scrollProgress, [0.35, 0.65], ['#FAFAFA', '#F0EDFF'])

  // Waveform bridge: appears during the crossover gap
  const waveOpacity = useTransform(scrollProgress, [0.42, 0.48, 0.52, 0.58], [0, 1, 1, 0])
  // Waveform sweeps from left to right during transition
  const waveSweep = useTransform(scrollProgress, [0.42, 0.58], ['0%', '100%'])

  // Label crossfade -- problem label and solution label swap crisply
  const problemLabelOpacity = useTransform(scrollProgress, [0.46, 0.50], [1, 0])
  const solutionLabelOpacity = useTransform(scrollProgress, [0.50, 0.54], [0, 1])

  // Mobile: stacked panels with fade
  if (!isLargeScreen) {
    return (
      <section className="py-16 sm:py-20">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
            className="space-y-12 max-w-3xl mx-auto"
          >
            {/* Problem */}
            <motion.div variants={staggerItem}>
              <p className="text-sm font-semibold text-forest/40 uppercase tracking-[0.2em] mb-5 text-center">
                The problem
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-forest text-center leading-tight mb-4">
                Documentation takes as long as the session
              </h2>
              <p className="text-base text-ink-light text-center max-w-xl mx-auto mb-8">
                Therapists spend 1-2 hours every evening catching up on clinical notes. It's the #1 driver of burnout.
              </p>
              <ProblemMockUI />
            </motion.div>

            {/* Waveform divider */}
            <motion.div variants={staggerItem} className="flex items-center justify-center gap-3 py-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-sage-dark/20" />
              <div className="flex items-end gap-[2px] h-8">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full"
                    style={{
                      height: `${20 + Math.sin(i * 0.5) * 40 + Math.cos(i * 0.3) * 25}%`,
                      backgroundColor: `rgba(87, 84, 255, ${0.15 + (Math.sin(i * 0.4) * 0.2)})`,
                      animation: `waveform 1.5s ease-in-out ${(i * 0.1) % 2}s infinite alternate`,
                    }}
                  />
                ))}
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-sage-dark/20" />
            </motion.div>

            {/* Solution */}
            <motion.div variants={staggerItem}>
              <p className="text-sm font-semibold text-forest/40 uppercase tracking-[0.2em] mb-5 text-center">
                The solution
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-forest text-center leading-tight mb-4">
                Your note is ready before you stand up
              </h2>
              <p className="text-base text-ink-light text-center max-w-xl mx-auto mb-8">
                AI Scribe listens, understands therapeutic context, and generates clinical documentation you can trust.
              </p>
              <SolutionMockUI />
            </motion.div>
          </motion.div>
        </div>
      </section>
    )
  }

  // Desktop: crossfade with waveform bridge (300vh for gradual scroll)
  return (
    <div ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <motion.div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        <div className="section-container">
          <div className="relative max-w-5xl mx-auto h-[70vh]">

            {/* Section label -- pinned at top, crisp swap */}
            <div className="absolute top-6 left-0 right-0 flex justify-center z-20">
              <div className="relative h-5">
                <motion.p
                  className="absolute inset-0 text-sm font-semibold text-forest/40 uppercase tracking-[0.2em] text-center whitespace-nowrap"
                  style={{ opacity: problemLabelOpacity }}
                >
                  The problem
                </motion.p>
                <motion.p
                  className="absolute inset-0 text-sm font-semibold text-forest/40 uppercase tracking-[0.2em] text-center whitespace-nowrap"
                  style={{ opacity: solutionLabelOpacity }}
                >
                  The solution
                </motion.p>
              </div>
            </div>

            {/* Problem panel -- fades out in place */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-start pt-20"
              style={{ opacity: problemOpacity }}
            >
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] text-forest text-center leading-tight mb-6">
                Documentation takes as long
                <br />
                as the session
              </h2>
              <p className="text-lg text-ink-light text-center max-w-xl mb-12">
                Therapists spend 1-2 hours every evening catching up on clinical notes. It's the #1 driver of burnout.
              </p>
              <ProblemMockUI />
            </motion.div>

            {/* Waveform transition bridge -- appears during crossover */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
              style={{ opacity: waveOpacity }}
            >
              <div className="relative w-full max-w-2xl h-16 overflow-hidden">
                {/* Waveform bars */}
                <div className="flex items-end gap-[3px] h-full justify-center">
                  {Array.from({ length: 48 }).map((_, i) => {
                    const baseHeight = 20 + Math.sin(i * 0.4) * 35 + Math.cos(i * 0.25) * 25
                    return (
                      <div
                        key={i}
                        className="w-1.5 rounded-full"
                        style={{
                          height: `${Math.max(10, baseHeight)}%`,
                          backgroundColor: `rgba(87, 84, 255, ${0.2 + (baseHeight / 100) * 0.45})`,
                          animation: `waveform 1.2s ease-in-out ${(i * 0.06) % 1.5}s infinite alternate`,
                        }}
                      />
                    )
                  })}
                </div>
                {/* Sweep mask -- reveals bars left to right */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-current"
                  style={{
                    background: 'linear-gradient(to right, transparent, transparent)',
                    maskImage: 'linear-gradient(to right, black var(--sweep), transparent var(--sweep))',
                    WebkitMaskImage: 'linear-gradient(to right, black var(--sweep), transparent var(--sweep))',
                    // @ts-expect-error CSS custom property
                    '--sweep': waveSweep,
                  }}
                />
              </div>
            </motion.div>

            {/* Solution panel -- fades in, in place */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-start pt-20"
              style={{ opacity: solutionOpacity }}
            >
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] text-forest text-center leading-tight mb-6">
                Your note is ready
                <br />
                before you stand up
              </h2>
              <p className="text-lg text-ink-light text-center max-w-xl mb-12">
                AI Scribe listens, understands therapeutic context, and generates clinical documentation you can trust.
              </p>
              <SolutionMockUI />
            </motion.div>
          </div>
        </div>
      </motion.div>

    </div>
  )
}

function ProblemMockUI() {
  return (
    <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="sm:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-sage-dark/10">
        <div className="flex items-center gap-2 mb-4">
          <FileWarning size={18} className="text-ink-muted" />
          <span className="text-sm font-medium text-ink-muted">Progress Note - Incomplete</span>
        </div>
        <div className="space-y-3 text-[11px] text-ink-muted/70 leading-relaxed">
          <div>
            <span className="text-[10px] font-semibold text-ink-muted/50 uppercase tracking-wider">Subjective</span>
            <p className="mt-0.5">Client discussed anxiety related to work. Mentioned difficulty sleeping. Reports using breathing exercises with some...</p>
          </div>
          <div>
            <span className="text-[10px] font-semibold text-ink-muted/50 uppercase tracking-wider">Objective</span>
            <p className="mt-0.5 opacity-60">Affect appeared... eye contact was... need to check notes from...</p>
          </div>
          <div className="opacity-30">
            <span className="text-[10px] font-semibold text-ink-muted/50 uppercase tracking-wider">Assessment</span>
            <div className="h-2.5 bg-sage-dark/15 rounded-full w-2/5 mt-1" />
          </div>
          <div className="flex items-center gap-1 mt-3">
            <div className="w-1.5 h-5 bg-forest/30 animate-pulse rounded-sm" />
            <span className="text-xs text-ink-muted">Still typing...</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-sage-dark/10 flex-1 flex flex-col items-center justify-center">
          <Clock size={28} className="text-ink-muted mb-2" />
          <span className="font-serif text-2xl text-forest">9:47 PM</span>
          <span className="text-xs text-ink-muted mt-1">Still working</span>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-sage-dark/10 flex-1 flex flex-col items-center justify-center">
          <span className="font-serif text-3xl text-forest">6</span>
          <span className="text-xs text-ink-muted mt-1">Notes behind</span>
        </div>
      </div>
    </div>
  )
}

function SolutionMockUI() {
  return (
    <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="sm:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-sage-dark/10">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={18} className="text-forest" />
          <span className="text-sm font-medium text-forest">SOAP Note - Complete</span>
          <CheckCircle2 size={16} className="text-forest ml-auto" />
        </div>
        <div className="space-y-3">
          {[
            { section: 'Subjective', text: 'Client reports improved sleep quality and reduced anxiety since last session. Expressed concern about upcoming work presentation...' },
            { section: 'Objective', text: 'Affect: euthymic with full range. Eye contact: good. Speech: normal rate and rhythm. Engaged actively in CBT exercises...' },
            { section: 'Assessment', text: 'Generalized Anxiety Disorder, improving. Client demonstrates increased use of coping strategies. PHQ-9: 8 (mild)...' },
            { section: 'Plan', text: 'Continue weekly CBT sessions. Practice progressive muscle relaxation. Review thought record at next session...' },
          ].map((item) => (
            <div key={item.section} className="flex items-start gap-2.5">
              <CheckCircle2 size={14} className="text-forest/50 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <span className="text-xs font-semibold text-forest uppercase tracking-wider">{item.section}</span>
                <p className="text-[11px] text-ink-light leading-relaxed mt-0.5 line-clamp-2">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-sage-dark/10 flex-1 flex flex-col items-center justify-center">
          <Sparkles size={28} className="text-forest mb-2" />
          <span className="font-serif text-2xl text-forest">3 min</span>
          <span className="text-xs text-ink-muted mt-1">Note generated</span>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-sage-dark/10 flex-1 flex flex-col items-center justify-center">
          <Mic size={28} className="text-forest mb-2" />
          <span className="font-serif text-2xl text-forest">99%</span>
          <span className="text-xs text-ink-muted mt-1">Client consent rate</span>
        </div>
      </div>
    </div>
  )
}
