import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features',     href: '#features' },
    { name: 'Why Us',       href: '#whyus' },
    { name: 'Pricing',      href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0f0d]/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/40'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-[70px] px-6 md:px-10">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-8 h-8 bg-[#4ade80] rounded-lg flex items-center justify-center font-bold text-[13px] text-[#0a0f0d] shadow-lg shadow-[#4ade80]/30 group-hover:shadow-[#4ade80]/50 transition-shadow">
            IS
          </div>
          <span className="text-white font-bold text-[17px] tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            InvoiceSync
          </span>
        </Link>

        {/* Center Nav (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-[#6b8f76] hover:text-white transition-colors duration-200 hover:translate-y-[-1px]"
              style={{ display: 'inline-block', transition: 'color 0.2s, transform 0.2s' }}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-semibold text-[#6b8f76] hover:text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm font-bold text-[#0a0f0d] bg-[#4ade80] hover:bg-[#86efac] px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-[#4ade80]/20 hover:shadow-[#4ade80]/40 hover:scale-[1.02]"
            style={{ fontFamily: 'Plus Jakarta Sans' }}
          >
            Get Started
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[70px] left-0 w-full bg-[#0a0f0d]/95 backdrop-blur-xl border-b border-white/5 animate-fade-in">
          <div className="flex flex-col items-center gap-6 py-8 px-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#6b8f76] hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col w-full gap-3 mt-2 border-t border-white/5 pt-6">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl border border-white/10 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-xl bg-[#4ade80] text-[#0a0f0d] text-sm font-bold hover:bg-[#86efac] transition-colors shadow-lg shadow-[#4ade80]/20"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
