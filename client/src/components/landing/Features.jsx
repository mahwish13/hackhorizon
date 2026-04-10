import { useState } from 'react';
import { Link } from 'react-router-dom';

const featuresList = [
  {
    id: 1,
    title: "Invoice Upload",
    description: "Sellers can create and upload invoices instantly with all GST-required fields. Set buyer GSTIN, add tax breakdowns (CGST, SGST, IGST), and submit in seconds. Every invoice is tracked from creation to payment.",
    videoPlaceholder: "Invoice Upload Demo",
    icon: "📤"
  },
  {
    id: 2,
    title: "Buyer Validation",
    description: "Buyers get a clean dashboard showing all received invoices. Accept, reject, or request modification with a single click. Every action is logged with a timestamp and optional note for full audit trail.",
    videoPlaceholder: "Buyer Validation Demo",
    icon: "✅"
  },
  {
    id: 3,
    title: "Status Tracking",
    description: "Every invoice moves through a clear lifecycle: Pending → Accepted / Rejected / Modified. Color-coded badges make status instantly scannable. The full history of status changes is available per invoice.",
    videoPlaceholder: "Status Tracking Demo",
    icon: "📊"
  },
  {
    id: 4,
    title: "GST Summary",
    description: "Auto-calculated GST dashboard showing CGST, SGST, and IGST breakdowns. Separate views for GST collected (seller) and GST payable (buyer). Charts update as invoices are accepted.",
    videoPlaceholder: "GST Summary Demo",
    icon: "🧾"
  },
  {
    id: 5,
    title: "Payment Tracking",
    description: "Sellers mark invoices as Paid or Unpaid with one click. Buyers see outstanding amounts at a glance. Dashboard tiles show total billed, total received, and pending amounts.",
    videoPlaceholder: "Payment Tracking Demo",
    icon: "💳"
  },
  {
    id: 6,
    title: "Invoice Requests",
    description: "Buyers can request missing invoices directly from the platform. Sellers see all incoming requests in one place and can fulfil them instantly. No more chasing invoices over email.",
    videoPlaceholder: "Invoice Requests Demo",
    icon: "📨"
  }
];

export default function Features() {
  const [activeFeature, setActiveFeature] = useState(featuresList[0]);

  return (
    <section
      id="features"
      className="bg-[#0a0f0d] py-32 relative overflow-hidden"
    >
      {/* bg glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4ade80]/4 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-8 sm:px-12 md:px-16 relative">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 border border-[#4ade80]/20 bg-[#4ade80]/8 text-[#4ade80] rounded-full px-2 py-1.5 text-xs font-semibold tracking-wide mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
            What we offer
          </div>
          <h2
            className="text-[clamp(1.8rem,4vw,2.75rem)] font-extrabold text-white leading-tight mb-5"
            style={{ fontFamily: 'Plus Jakarta Sans' }}
          >
            Built for real B2B workflows
          </h2>
          <p className="text-[#6b8f76] text-base max-w-xl leading-relaxed">
            Every feature is designed around how sellers and buyers actually work together.
          </p>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-nowrap overflow-x-auto justify-start lg:justify-center gap-3 mb-16 pb-4 custom-scrollbar">
          {featuresList.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setActiveFeature(feature)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 border ${
                activeFeature.id === feature.id
                  ? 'bg-[#4ade80] text-[#0a0f0d] border-[#4ade80] shadow-lg shadow-[#4ade80]/25'
                  : 'bg-[#111a15] text-[#6b8f76] border-[#243124] hover:border-[#4ade80]/30 hover:text-white'
              }`}
              style={{ fontFamily: 'Plus Jakarta Sans' }}
            >
              {feature.title}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* Left: Description */}
          <div
            key={`text-${activeFeature.id}`}
            className="flex flex-col items-center text-center lg:items-start lg:text-left animate-fade-up"
          >
            <span
              className="text-8xl font-extrabold text-[#243124] leading-none mb-4 select-none"
              style={{ fontFamily: 'Plus Jakarta Sans' }}
            >
              0{activeFeature.id}
            </span>
            <h3
              className="text-[2rem] font-bold text-white leading-tight mb-5"
              style={{ fontFamily: 'Plus Jakarta Sans' }}
            >
              {activeFeature.title}
            </h3>
            <p className="text-[#6b8f76] text-base leading-relaxed mb-10 w-full max-w-md mx-auto lg:mx-0">
              {activeFeature.description}
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#4ade80] hover:text-white transition-colors group"
            >
              Learn more
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>

          {/* Right: Video Placeholder */}
          <div
            key={`video-${activeFeature.id}`}
            className="relative bg-[#111a15] border border-[#243124] rounded-[2rem] aspect-video flex flex-col items-center justify-center shadow-2xl overflow-hidden animate-fade-up"
            style={{ animationDelay: '0.1s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#4ade80]/5 via-transparent to-transparent" />

            <div className="relative z-10 w-16 h-16 rounded-full bg-[#4ade80]/15 border border-[#4ade80]/30 flex items-center justify-center mb-4 cursor-pointer hover:bg-[#4ade80]/25 hover:scale-110 transition-all duration-300 shadow-lg shadow-[#4ade80]/10">
              <svg className="w-6 h-6 text-[#4ade80] ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4l12 6-12 6V4z" />
              </svg>
            </div>

            <p
              className="relative z-10 text-[#6b8f76] text-sm font-semibold"
              style={{ fontFamily: 'Plus Jakarta Sans' }}
            >
              {activeFeature.videoPlaceholder}
            </p>

            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fadeUp 0.45s cubic-bezier(.16,1,.3,1) forwards; }
      `}</style>
    </section>
  );
}