const testimonialsData = [
  { name: "Arjun Mehta", role: "CFO, Mehta Textiles", text: "We used to spend 3 days every month reconciling invoices. With InvoiceSync, buyers confirm the same day. Our DSO dropped by 40%.", rating: 5, initials: "AM", color: "#375534" },
  { name: "Priya Nair", role: "Accounts Head, Nair Pharma", text: "The GST breakdown dashboard alone saved us 8 hours per month. CGST and SGST are auto-calculated and always accurate.", rating: 5, initials: "PN", color: "#0F2A1D" },
  { name: "Rohit Sharma", role: "Founder, RS Traders", text: "Chasing buyers for invoice confirmation was a nightmare. Now they get notified, they click accept, we get paid. Simple.", rating: 5, initials: "RS", color: "#6B9071" },
  { name: "Sneha Kulkarni", role: "Operations Lead, SKL Exports", text: "The status tracking feature is incredible. Every team member can see exactly where an invoice stands without asking anyone.", rating: 4, initials: "SK", color: "#375534" },
  { name: "Vikram Joshi", role: "Director, Joshi Industrial", text: "We handle 500+ invoices a month. InvoiceSync's buyer dashboard makes validation 10x faster. Worth every rupee.", rating: 5, initials: "VJ", color: "#0F2A1D" },
  { name: "Meera Patel", role: "Finance Manager, Patel Goods", text: "The missing invoice request feature is a gem. No more emails. Buyer clicks request, we upload, done.", rating: 5, initials: "MP", color: "#6B9071" }
];

// Duplicated array for seamless horizontal loop on mobile
const mobileTestimonials = [...testimonialsData, ...testimonialsData];

export default function Testimonials() {

  const renderStars = (rating) => (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-base ${i < rating ? 'text-primary' : 'text-white/20'}`}>
          ★
        </span>
      ))}
    </div>
  );

  const TestimonialCard = ({ t, isMobile }) => {
    const parts = t.role.split(', ');
    const roleTitle = parts[0];
    const companyName = parts[1] || parts[0];

    return (
      <div 
        className={`break-inside-avoid bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 hover:bg-white/10 transition-colors shadow-lg ${isMobile ? 'inline-block w-[320px] whitespace-normal' : 'w-full'}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-inner uppercase tracking-wider"
              style={{ backgroundColor: t.color, fontFamily: 'Plus Jakarta Sans' }}
            >
              {t.initials}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white leading-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>{t.name}</span>
              <span className="text-xs text-secondary mt-0.5">{roleTitle}</span>
            </div>
          </div>
          <div>
            {renderStars(t.rating)}
          </div>
        </div>
        
        <p className="mt-5 text-sm text-[#AEC3B0] leading-relaxed italic" style={{ fontFamily: 'Inter' }}>
          "{t.text}"
        </p>

        <div className="mt-5 border-t border-white/10 pt-4 flex items-center">
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
            {companyName}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id="testimonials" className="bg-dark py-24 px-0 md:px-10 overflow-hidden">
      
      {/* Header */}
      <div className="text-center mb-16 px-6 max-w-2xl mx-auto flex flex-col items-center">
        <div className="inline-flex bg-primary/20 text-primary rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-6">
          What our users say
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
          Real businesses. Real results.
        </h2>
        <p className="text-sm text-secondary mt-3 leading-relaxed" style={{ fontFamily: 'Inter' }}>
          Thousands of Indian businesses use InvoiceSync to close their invoice cycles faster.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Desktop Masonry Grid (Hidden on Mobile) */}
        <div className="hidden md:block w-full px-6">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {testimonialsData.map((t, i) => (
              <TestimonialCard key={`desktop-${i}`} t={t} isMobile={false} />
            ))}
          </div>
        </div>

        {/* Mobile Horizontal Marquee (Hidden on Desktop) */}
        <div className="block md:hidden relative w-full overflow-hidden group">
          <div 
            className="flex w-max gap-4 px-4 group-hover:[animation-play-state:paused]" 
            style={{ animation: 'scrollLeftMobile 30s linear infinite' }}
          >
            {mobileTestimonials.map((t, i) => (
              <TestimonialCard key={`mobile-${i}`} t={t} isMobile={true} />
            ))}
          </div>
        </div>

      </div>

      {/* Footer Metrics */}
      <div className="mt-20 text-center flex flex-col items-center px-6">
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-primary text-[24px]">★</span>
          ))}
        </div>
        <div className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>
          4.9/5 average rating from 2,000+ businesses
        </div>
        <div className="text-xs text-secondary uppercase tracking-widest font-semibold mt-1">
          Based on verified user feedback
        </div>
      </div>

      <style>{`
        @keyframes scrollLeftMobile {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

    </section>
  );
}
