export default function WhyUs() {
  const points = [
    {
      icon: (
        <svg className="w-5 h-5 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Real-time collaboration',
      desc: 'Sellers and buyers work on the same invoice simultaneously. No version confusion, no email threads.'
    },
    {
      icon: (
        <svg className="w-5 h-5 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Built for Indian GST',
      desc: 'CGST, SGST, IGST handled automatically. No manual calculations, no errors.'
    },
    {
      icon: (
        <svg className="w-5 h-5 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      title: 'Full audit trail',
      desc: 'Every status change, every action — logged, timestamped, and searchable.'
    }
  ];

  const stats = [
    { val: '10,000+', label: 'Invoices processed', pct: 85 },
    { val: '98%',     label: 'Acceptance rate',   pct: 98 },
    { val: '< 2min',  label: 'Avg. validation',   pct: 20 },
    { val: 'Zero',    label: 'GST calc errors',   pct: 100 }
  ];

  const badges = ['256-bit SSL', 'GSTN Compliant', 'ISO Ready', 'Data Encrypted'];

  return (
    <section id="whyus" className="bg-[#0a0f0d] py-28 px-6 md:px-10 relative overflow-hidden">
      {/* glow */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-[#4ade80]/4 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative flex flex-col items-center text-center">
        <div className="grid lg:grid-cols-1 gap-16 items-center">

          {/* Left Column */}
          <div className="flex flex-col items-center">
            <div className="inline-flex items-center gap-2 border border-[#4ade80]/20 bg-[#4ade80]/8 text-[#4ade80] rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
              Why InvoiceSync
            </div>
            <h2
              className="text-[clamp(1.8rem,4vw,2.75rem)] font-extrabold text-white leading-tight mb-5"
              style={{ fontFamily: 'Plus Jakarta Sans' }}
            >
              Stop chasing invoices.{' '}
              <br className="hidden sm:block" />
              <span className="gradient-text">Start closing deals.</span>
            </h2>
            <p className="text-[#6b8f76] text-base leading-relaxed max-w-2xl mb-12">
              Most invoice tools are built for accountants. InvoiceSync is built for the people who actually send and receive invoices every day.
            </p>

            <div className="flex flex-col gap-7 items-center max-w-xl mx-auto">
              {points.map((pt, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-4 items-center sm:items-start group text-center sm:text-left">
                  <div className="w-10 h-10 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/15 flex-shrink-0 flex items-center justify-center group-hover:bg-[#4ade80]/20 group-hover:border-[#4ade80]/35 transition-all duration-300">
                    {pt.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1" style={{ fontFamily: 'Plus Jakarta Sans' }}>{pt.title}</h4>
                    <p className="text-[#6b8f76] text-sm leading-relaxed">{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((st, i) => (
                <div
                  key={i}
                  className="bg-[#111a15] border border-[#243124] rounded-2xl p-6 relative overflow-hidden hover:border-[#4ade80]/30 transition-all duration-300 group"
                >
                  <div
                    className="text-[2.25rem] font-extrabold text-white leading-none mb-2"
                    style={{ fontFamily: 'Plus Jakarta Sans' }}
                  >
                    {st.val}
                  </div>
                  <div className="text-xs text-[#6b8f76] font-medium mb-4">{st.label}</div>

                  {/* Progress bar */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#243124]" />
                  <div
                    className="absolute bottom-0 left-0 h-0.5 bg-[#4ade80]/70 group-hover:bg-[#4ade80] transition-colors duration-300"
                    style={{ width: `${st.pct}%` }}
                  />
                </div>
              ))}
            </div>

            {/* Trust Strip */}
            <div className="bg-[#111a15] border border-[#243124] rounded-2xl p-5 w-full flex flex-col items-center">
              <p className="text-[10px] text-[#3d5945] uppercase tracking-[0.2em] font-bold mb-4">Secured by</p>
              <div className="flex flex-wrap justify-center gap-2">
                {badges.map((badge, i) => (
                  <span
                    key={i}
                    className="border border-[#243124] bg-[#192319] hover:border-[#4ade80]/30 hover:bg-[#4ade80]/5 transition-all text-[#6b8f76] hover:text-white rounded-full px-3.5 py-1.5 text-xs font-semibold cursor-default"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
