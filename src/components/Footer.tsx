export function Footer() {
  return (
    <footer className="bg-forest-dark border-t border-white/[0.06] py-14 lg:py-16">
      <div className="section-container">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 lg:gap-16 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-forest rounded-[10px] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F0EDFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18" />
                  <path d="M8 7c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-4" />
                  <path d="M8 13h5a2 2 0 0 1 0 4H8" />
                </svg>
              </div>
              <span className="font-serif text-[1.15rem] text-sage tracking-tight">AI Scribe</span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed max-w-[200px]">
              Clinical documentation powered by SonderMind.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-[0.2em] mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li><a href="#how-it-works" className="text-sm text-white/40 hover:text-sage transition-colors duration-300">How It Works</a></li>
              <li><a href="#features" className="text-sm text-white/40 hover:text-sage transition-colors duration-300">Features</a></li>
              <li><a href="#pricing" className="text-sm text-white/40 hover:text-sage transition-colors duration-300">Pricing</a></li>
              <li><a href="#security" className="text-sm text-white/40 hover:text-sage transition-colors duration-300">Security</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-[0.2em] mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="#mission" className="text-sm text-white/40 hover:text-sage transition-colors duration-300">Mission</a></li>
              <li><a href="https://www.sondermind.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-sage transition-colors duration-300">SonderMind</a></li>
              <li><a href="https://www.sondermind.com/careers" target="_blank" rel="noopener noreferrer" className="text-sm text-white/40 hover:text-sage transition-colors duration-300">Careers</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-white/50 uppercase tracking-[0.2em] mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-white/40 hover:text-sage transition-colors duration-300">Terms & Conditions</a></li>
              <li><a href="#" className="text-sm text-white/40 hover:text-sage transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-white/40 hover:text-sage transition-colors duration-300">BAA</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-white/20 text-xs">&copy; {new Date().getFullYear()} SonderMind, Inc. All rights reserved.</span>
          <span className="text-white/15 text-xs">HIPAA Compliant &middot; SOC 2 Type II Certified</span>
        </div>
      </div>
    </footer>
  )
}
