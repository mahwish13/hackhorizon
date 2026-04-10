import { Link } from 'react-router-dom';

export default function Footer() {
  const productLinks  = ["Features", "Pricing", "Dashboard", "API Docs", "Changelog"];
  const companyLinks  = ["About", "Blog", "Careers", "Press Kit", "Contact"];
  const legalLinks    = ["Privacy Policy", "Terms of Service", "Cookie Policy", "GST Compliance", "Security"];

  const stats = [
    { val: "10,000+", label: "Invoices" },
    { val: "500+",    label: "Businesses" },
    { val: "₹50Cr+",  label: "Processed" },
    { val: "99.9%",   label: "Uptime" },
  ];

  const socials = [
    { name: "Twitter",  path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
    { name: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" },
    { name: "Github",   path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" },
  ];

  return (
    <footer className="bg-[#0a0f0d] pt-20 pb-10 px-6 md:px-10 border-t border-[#111a15] relative overflow-hidden">
      {/* subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#4ade80]/3 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">

        {/* Top: Branding + Links Grid */}
        <div className="flex flex-col items-center text-center gap-12 pb-16 border-b border-[#111a15]">

          {/* Col 1: Branding */}
          <div className="flex flex-col items-center max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2.5 w-max mb-4">
              <div className="w-8 h-8 bg-[#4ade80] rounded-lg flex items-center justify-center font-bold text-[13px] text-[#0a0f0d] shadow-lg shadow-[#4ade80]/30">
                IS
              </div>
              <span className="text-white font-bold text-[17px] tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                InvoiceSync
              </span>
            </div>
            <p className="text-sm text-[#6b8f76] leading-relaxed max-w-xs mb-8">
              The smartest way for Indian businesses to collaborate on invoices — GST-ready, real-time, and built for scale.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2.5 mb-10">
              {socials.map((s, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={s.name}
                  className="w-9 h-9 rounded-xl bg-[#111a15] border border-[#243124] flex items-center justify-center text-[#6b8f76] hover:bg-[#4ade80]/10 hover:border-[#4ade80]/30 hover:text-[#4ade80] transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="w-full">
              <h4 className="text-xs font-bold text-[#6b8f76] uppercase tracking-widest mb-3">Get product updates</h4>
              <div className="flex justify-center flex-col sm:flex-row gap-2 sm:gap-0 max-w-sm mx-auto">
                <input
                  type="email"
                  placeholder="Work email address"
                  className="bg-[#111a15] border border-[#243124] border-r-0 rounded-l-xl px-4 py-2.5 text-sm text-white placeholder-[#3d5945] flex-1 outline-none focus:border-[#4ade80]/40 transition-colors"
                />
                <button className="bg-[#4ade80] hover:bg-[#86efac] text-[#0a0f0d] rounded-r-xl px-4 text-sm font-bold transition-colors shadow-lg shadow-[#4ade80]/20 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 lg:gap-24 justify-center w-full mt-4">
            {/* Col 2: Product */}
            <div className="flex flex-col items-center">
              <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.18em] mb-5">Product</h3>
            <div className="flex flex-col gap-3.5">
              {productLinks.map((link, i) => (
                <Link key={i} to="/" className="footer-link-item text-sm text-[#6b8f76]">{link}</Link>
              ))}
            </div>
          </div>

          {/* Col 3: Company */}
          <div className="flex flex-col items-center">
            <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.18em] mb-5">Company</h3>
            <div className="flex flex-col gap-3.5">
              {companyLinks.map((link, i) => (
                <Link key={i} to="/" className="footer-link-item text-sm text-[#6b8f76]">{link}</Link>
              ))}
            </div>
          </div>

          {/* Col 4: Legal */}
          <div className="flex flex-col items-center">
            <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.18em] mb-5">Legal</h3>
            <div className="flex flex-col gap-3.5">
              {legalLinks.map((link, i) => (
                <Link key={i} to="/" className="footer-link-item text-sm text-[#6b8f76]">{link}</Link>
              ))}
            </div>
          </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="py-10 border-b border-[#111a15] flex flex-wrap justify-center gap-10 md:gap-20">
          {stats.map((st, i) => (
            <div key={i} className="text-center">
              <div className="font-extrabold text-white text-3xl mb-1" style={{ fontFamily: 'Plus Jakarta Sans' }}>{st.val}</div>
              <div className="text-[11px] text-[#3d5945] uppercase tracking-widest font-semibold">{st.label}</div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-xs text-[#3d5945] font-medium">© 2024 InvoiceSync. All rights reserved.</div>
          <div className="flex flex-wrap justify-center gap-2">
            {['GSTN Ready', 'SSL Secured', 'Made in India ♥'].map((badge, i) => (
              <span key={i} className="border border-[#243124] bg-[#111a15] text-[#3d5945] text-[11px] px-3.5 py-1.5 rounded-full font-semibold">
                {badge}
              </span>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .footer-link-item {
          position: relative;
          transition: color 0.2s ease, padding-left 0.25s ease;
        }
        .footer-link-item:hover {
          color: #e8f5ec;
          transform: translateY(-2px);
        }
        .footer-link-item::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 100%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          margin-top: 2px;
          border-radius: 50%;
          background: #4ade80;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .footer-link-item:hover::before { opacity: 1; }
      `}</style>
    </footer>
  );
}
