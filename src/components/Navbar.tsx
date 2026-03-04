import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollDirection } from '../hooks/useScrollDirection'
import { Menu, X, ArrowRight } from 'lucide-react'

interface NavbarProps {
  onOpenModal: () => void
}

export function Navbar({ onOpenModal }: NavbarProps) {
  const { scrollDirection, scrollY } = useScrollDirection()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isHidden = scrollDirection === 'down' && scrollY > 100
  const hasBackground = scrollY > 20

  const navLinks = [
    { label: 'Product', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Security', href: '#security' },
    { label: 'Mission', href: '#mission' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      } ${hasBackground ? 'bg-cream/80 backdrop-blur-xl' : 'bg-transparent'}`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-forest rounded-[10px] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F0EDFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3v18" />
                <path d="M8 7c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-4" />
                <path d="M8 13h5a2 2 0 0 1 0 4H8" />
              </svg>
            </div>
            <span className="font-serif text-[1.15rem] text-forest tracking-tight">AI Scribe</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <a
                key={link.href + link.label}
                href={link.href}
                className="text-[13px] font-medium text-ink-light/70 hover:text-forest transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={onOpenModal}
              className="group inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-white text-[13px] font-semibold rounded-full hover:bg-forest-light hover:-translate-y-0.5 transition-all duration-300 active:scale-[0.98]"
            >
              Join Waitlist
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-ink-light"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-cream/95 backdrop-blur-xl border-t border-sage-dark/10"
          >
            <div className="section-container py-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  className="block text-[15px] font-medium text-ink-light hover:text-forest py-2.5 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3">
                <button
                  className="block w-full text-center px-5 py-3 bg-forest text-white text-[15px] font-semibold rounded-full hover:bg-forest-light transition-colors"
                  onClick={() => {
                    setMobileOpen(false)
                    onOpenModal()
                  }}
                >
                  Join Waitlist
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
