import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Why Us', href: '#whyus' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <nav
      className={`sticky top-0 w-full z-50 h-[68px] flex items-center justify-between px-6 md:px-10 transition-all duration-300 ${
        scrolled ? 'bg-dark/95 backdrop-blur-md border-b border-white/10' : 'bg-[#0F2A1D]'
      }`}
    >
      {/* Left side: Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
          IS
        </div>
        <span 
          className="text-white font-bold text-[18px]" 
          style={{ fontFamily: 'Plus Jakarta Sans' }}
        >
          InvoiceSync
        </span>
      </div>

      {/* Center: Links (Desktop) */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-sm font-medium text-[#AEC3B0] hover:text-white transition duration-200"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Right side: Buttons (Desktop) & Hamburger (Mobile) */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="bg-transparent border border-secondary text-white rounded-lg px-4 py-2 text-sm hover:bg-secondary/20 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-primary text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary/90 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Hamburger Menu Icon */}
        <button
          className="md:hidden text-white focus:outline-none p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="absolute top-[68px] left-0 w-full bg-dark border-b border-white/10 flex flex-col items-center py-6 gap-6 md:hidden shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#AEC3B0] hover:text-white transition duration-200"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col w-full px-6 gap-3 mt-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-transparent border border-secondary text-white rounded-lg px-4 py-2 text-sm hover:bg-secondary/20 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-primary text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary/90 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
