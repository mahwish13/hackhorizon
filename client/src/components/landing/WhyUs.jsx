export default function WhyUs() {
  const points = [
    { icon: '→', title: 'Real-time collaboration', desc: 'Sellers and buyers work on the same invoice simultaneously. No version confusion.' },
    { icon: '✓', title: 'Built for Indian GST', desc: 'CGST, SGST, IGST handled automatically. No manual calculations.' },
    { icon: '↻', title: 'Full audit trail', desc: 'Every status change, every action — logged, timestamped, and accessible.' }
  ];

  const stats = [
    { val: '10,000+', label: 'Invoices processed', progress: 'w-[85%]' },
    { val: '98%', label: 'Acceptance rate', progress: 'w-[98%]' },
    { val: '< 2min', label: 'Average validation time', progress: 'w-[15%]' },
    { val: 'Zero', label: 'GST calculation errors', progress: 'w-full' }
  ];

  const badges = ["256-bit SSL", "GSTN Compliant", "ISO Ready", "Data Encrypted"];

  return (
    <section id="whyus" className="bg-dark py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column (Content & List) */}
        <div>
          <div className="inline-flex items-center bg-primary/20 text-primary rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-2">
            Why InvoiceSync
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-4 leading-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Stop chasing invoices. <br className="hidden sm:block" />Start closing deals.
          </h2>
          <p className="text-sm text-secondary mt-5 leading-relaxed max-w-lg" style={{ fontFamily: 'Inter' }}>
            Most invoice tools are built for accountants. InvoiceSync is built for the people who actually send and receive invoices every day.
          </p>
          
          <div className="mt-10 flex flex-col gap-6">
            {points.map((pt, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex-shrink-0 flex items-center justify-center text-primary font-bold group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-inner">
                  {pt.icon}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{pt.title}</h4>
                  <p className="text-xs text-secondary mt-1.5 max-w-sm leading-relaxed">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (Stat Cards Grid) */}
        <div className="flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((st, i) => (
              <div 
                key={i} 
                className="bg-white/5 border border-white/10 rounded-[1.25rem] p-6 relative overflow-hidden flex flex-col hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  {st.val}
                </div>
                <div className="text-xs text-secondary mt-2.5 font-medium">
                  {st.label}
                </div>
                
                {/* Decorative Bottom Progress Lines */}
                <div className="absolute bottom-0 left-0 h-1 bg-primary/20 w-full" />
                <div 
                  className={`absolute bottom-0 left-0 h-1 bg-primary group-hover:opacity-100 opacity-80 transition-opacity ${st.progress}`} 
                />
              </div>
            ))}
          </div>

          {/* Secured By Trust Strip */}
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap items-center gap-3">
            <span className="text-xs text-secondary/70 uppercase tracking-widest font-bold mr-2">
              Secured by
            </span>
            {badges.map((badge, i) => (
              <span 
                key={i} 
                className="border border-white/10 bg-white/5 hover:bg-white/10 transition-colors rounded-full px-3.5 py-1.5 text-xs text-secondary font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
