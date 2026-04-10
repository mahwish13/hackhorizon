import { Link } from 'react-router-dom';

export default function Footer() {
  const productLinks = ["Features", "Pricing", "Dashboard", "API Docs", "Changelog"];
  const companyLinks = ["About", "Blog", "Careers", "Press Kit", "Contact"];
  const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy", "GST Compliance", "Security"];

  const stats = [
    { val: "10,000+", label: "Invoices" },
    { val: "500+", label: "Businesses" },
    { val: "₹50Cr+", label: "Processed" },
    { val: "99.9%", label: "Uptime" },
  ];

  return (
    <footer className="bg-dark pt-20 pb-10 px-6 md:px-10 overflow-hidden">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
        
        {/* Column 1 (Branding & Newsletter) */}
        <div className="lg:col-span-2">
          {/* Logo Group */}
          <div className="flex items-center gap-3 w-max group relative cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-sm transition-transform duration-300 group-hover:rotate-6 shadow-inner">
              IS
            </div>
            <span className="text-white font-bold text-[18px]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              InvoiceSync
            </span>
            
            {/* Tooltip trigger */}
            <div className="absolute -top-10 left-0 bg-primary text-white text-xs px-3 py-1.5 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 whitespace-nowrap shadow-xl">
              Invoice collaboration re-imagined
              {/* Tooltip arrow */}
              <div className="absolute -bottom-1 left-4 w-2 h-2 bg-primary rotate-45" />
            </div>
          </div>
          
          <p className="text-sm text-secondary mt-4 max-w-xs leading-relaxed" style={{ fontFamily: 'Inter' }}>
            The smartest way for Indian businesses to collaborate on invoices.
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex gap-3">
            {[
              { name: "Twitter", icon: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
              { name: "LinkedIn", icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" },
              { name: "Github", icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" }
            ].map((social, i) => (
              <a 
                key={i} 
                href="#"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors"
                aria-label={social.name}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  {social.name === "LinkedIn" && <circle cx="4" cy="4" r="2" />}
                  <path stroke={social.name === "Twitter" || social.name === "Github" ? "currentColor" : "none"} fill="none" strokeWidth={social.name === "Github" ? "2" : "0"} strokeLinecap="round" strokeLinejoin="round" d={social.icon} />
                </svg>
              </a>
            ))}
          </div>

          {/* Newsletter Form */}
          <div className="mt-8">
            <h4 className="text-xs font-medium text-white mb-2 uppercase tracking-wide">
              Get product updates
            </h4>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Work email address" 
                className="bg-white/10 border border-white/10 rounded-l-lg px-4 py-2.5 text-sm text-white placeholder-secondary/50 flex-1 outline-none focus:border-secondary transition-colors"
              />
              <button className="bg-primary text-white rounded-r-lg px-4 py-2.5 text-sm font-medium hover:bg-primary/80 transition-colors border border-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Column 2 (Product) */}
        <div>
          <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-6">Product</h3>
          <div className="flex flex-col gap-3.5">
            {productLinks.map((link, i) => (
              <Link key={i} to="/" className="footer-link-item text-sm text-[#AEC3B0] transition-colors w-max">
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3 (Company) */}
        <div>
          <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-6">Company</h3>
          <div className="flex flex-col gap-3.5">
            {companyLinks.map((link, i) => (
              <Link key={i} to="/" className="footer-link-item text-sm text-[#AEC3B0] transition-colors w-max">
                {link}
              </Link>
            ))}
          </div>
        </div>

        {/* Column 4 (Legal) */}
        <div>
          <h3 className="text-xs font-semibold text-white uppercase tracking-widest mb-6">Legal</h3>
          <div className="flex flex-col gap-3.5">
            {legalLinks.map((link, i) => (
              <Link key={i} to="/" className="footer-link-item text-sm text-[#AEC3B0] transition-colors w-max">
                {link}
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Middle Section (Stats Strip) */}
      <div className="max-w-7xl mx-auto py-10 border-b border-white/10 flex flex-wrap justify-between gap-6">
        {stats.map((st, i) => (
          <div key={i} className="text-center sm:text-left flex-1 min-w-[120px]">
            <div className="font-extrabold text-white text-3xl" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              {st.val}
            </div>
            <div className="text-xs text-secondary mt-1 uppercase tracking-wider font-semibold">
              {st.label}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Bar (Copyright & Badges) */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-xs text-secondary font-medium">
          © 2024 InvoiceSync. All rights reserved.
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="border border-white/10 bg-white/5 text-secondary text-xs px-3.5 py-1.5 rounded-full font-medium tracking-wide">
            GSTN Ready
          </span>
          <span className="border border-white/10 bg-white/5 text-secondary text-xs px-3.5 py-1.5 rounded-full font-medium tracking-wide">
            SSL Secured
          </span>
          <span className="border border-white/10 bg-white/5 text-secondary text-xs px-3.5 py-1.5 rounded-full font-medium tracking-wide flex items-center gap-1.5">
            Made in India <span className="text-primary text-[10px]">♥</span>
          </span>
        </div>
      </div>

      <style>{`
        .footer-link-item {
          position: relative;
          will-change: transform, color;
          transition: transform 0.25s ease, color 0.15s ease;
        }
        
        .footer-link-item::before {
          content: "→ ";
          color: #375534;
          position: absolute;
          left: -18px;
          opacity: 0;
          transform: translateX(-4px);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          font-weight: 800;
        }
        
        .footer-link-item:hover {
          color: #fff;
          transform: translateX(18px);
        }
        
        .footer-link-item:hover::before {
          opacity: 1;
          transform: translateX(0);
        }
      `}</style>
    </footer>
  );
}
