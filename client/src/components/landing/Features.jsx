import { useState } from 'react';
import { Link } from 'react-router-dom';

const featuresList = [
  {
    id: 1,
    title: "Invoice Upload",
    description: "Sellers can create and upload invoices instantly with all GST-required fields. Set buyer GSTIN, add tax breakdowns (CGST, SGST, IGST), and submit in seconds. Every invoice is tracked from creation to payment.",
    videoPlaceholder: "Invoice Upload Demo"
  },
  {
    id: 2,
    title: "Buyer Validation",
    description: "Buyers get a clean dashboard showing all received invoices. Accept, reject, or request modification with a single click. Every action is logged with a timestamp and optional note for full audit trail.",
    videoPlaceholder: "Buyer Validation Demo"
  },
  {
    id: 3,
    title: "Status Tracking",
    description: "Every invoice moves through a clear lifecycle: Pending → Accepted / Rejected / Modified. Color-coded badges make status instantly scannable. The full history of status changes is available per invoice.",
    videoPlaceholder: "Status Tracking Demo"
  },
  {
    id: 4,
    title: "GST Summary",
    description: "Auto-calculated GST dashboard showing CGST, SGST, and IGST breakdowns. Separate views for GST collected (seller) and GST payable (buyer). Charts update as invoices are accepted.",
    videoPlaceholder: "GST Summary Demo"
  },
  {
    id: 5,
    title: "Payment Tracking",
    description: "Sellers mark invoices as Paid or Unpaid with one click. Buyers see outstanding amounts at a glance. Dashboard tiles show total billed, total received, and pending amounts.",
    videoPlaceholder: "Payment Tracking Demo"
  },
  {
    id: 6,
    title: "Invoice Requests",
    description: "Buyers can request missing invoices directly from the platform. Sellers see all incoming requests in one place and can fulfil them instantly. No more chasing invoices over email.",
    videoPlaceholder: "Invoice Requests Demo"
  }
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(featuresList[0]);

  return (
    <section id="features" className="bg-bg py-24 px-6 md:px-10">
      {/* Section Header */}
      <div className="text-center mb-16 flex flex-col items-center">
        <div className="bg-dark/10 text-dark rounded-full px-4 py-1.5 text-xs font-medium flex items-center mb-6">
          <span className="w-2 h-2 rounded-full bg-primary inline-block mr-2" />
          What we offer
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-dark" style={{ fontFamily: 'Plus Jakarta Sans' }}>
          Built for real B2B workflows
        </h2>
        <p className="text-sm text-secondary mt-3 max-w-xl mx-auto" style={{ fontFamily: 'Inter' }}>
          Every feature is designed around how sellers and buyers actually work together.
        </p>
      </div>

      {/* Feature Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto">
        {featuresList.map((feature) => (
          <button
            key={feature.id}
            onClick={() => setActiveFeature(feature)}
            className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
              activeFeature.id === feature.id
                ? 'bg-dark text-white border border-dark scale-105 shadow-md'
                : 'bg-card/40 text-dark border border-card hover:bg-card/70'
            }`}
          >
            {feature.title}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
        
        {/* Left Column (Description) */}
        {/* Using the key prop to force re-render and trigger animation on state change */}
        <div 
          key={`text-${activeFeature.id}`} 
          className="flex flex-col items-start animate-fade-in"
        >
          <div className="text-6xl font-extrabold text-card/60" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            0{activeFeature.id}
          </div>
          <h3 className="text-2xl font-bold text-dark mt-2" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            {activeFeature.title}
          </h3>
          <p className="text-sm leading-relaxed text-secondary mt-4 max-w-md" style={{ fontFamily: 'Inter' }}>
            {activeFeature.description}
          </p>
          <Link
            to="/login"
            className="text-primary text-sm font-semibold mt-6 hover:text-dark transition-colors inline-flex items-center gap-1 group"
          >
            Learn more <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </Link>
        </div>

        {/* Right Column (Video Placeholder) */}
        <div 
          key={`video-${activeFeature.id}`} 
          className="bg-dark rounded-[2rem] aspect-video flex flex-col items-center justify-center relative overflow-hidden shadow-xl animate-fade-in-delayed"
        >
          {/* Fake Play Button - interactive look */}
          <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center mb-4 cursor-pointer hover:bg-primary/40 hover:scale-110 transition-all z-10 border border-primary/10">
            {/* Play triangle */}
            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4l12 6-12 6V4z" />
            </svg>
          </div>
          <p className="text-secondary/90 text-sm font-medium z-10 text-center px-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            {activeFeature.videoPlaceholder}
          </p>
          
          {/* Subtle background glow for premium aesthetics */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0 pointer-events-none" />
        </div>

      </div>

      {/* Minimal CSS for dynamic mounting animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in-delayed {
          animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
