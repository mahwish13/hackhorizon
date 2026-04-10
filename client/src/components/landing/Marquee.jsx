const row1 = [
  'Tata Ventures', 'Infosys Supply', 'Wipro Traders', 'Reliance B2B', 'HCL Commerce',
  'Mahindra Goods', 'Birla Exports', 'HDFC Trade', 'Bajaj Suppliers', 'Sun Pharma B2B'
];

const row2 = [
  'Adani Logistics', 'Zomato Business', 'Swiggy Partners', 'Flipkart Wholesale',
  'Nykaa Trade', 'Meesho Sellers', 'Razorpay Biz', 'Zepto Commerce', 'Groww Business', 'Paytm B2B'
];

// Duplicate the arrays for a seamless loop
const row1Duplicated = [...row1, ...row1];
const row2Duplicated = [...row2, ...row2];

export default function Marquee() {
  return (
    <section className="bg-dark py-10 overflow-hidden border-y border-white/5">
      <p className="text-xs font-medium text-secondary text-center mb-6 uppercase tracking-widest">
        Trusted by leading businesses across India
      </p>

      {/* Row 1: Scrolls Left */}
      <div className="relative w-full flex overflow-hidden mb-6 group">
        <div 
          className="flex w-max gap-12 group-hover:[animation-play-state:paused]" 
          style={{ animation: 'scrollLeft 35s linear infinite' }}
        >
          {row1Duplicated.map((name, i) => (
            <div
              key={`r1-${i}`}
              className="font-semibold text-sm text-card px-6 py-2 border border-white/10 rounded-full whitespace-nowrap hover:border-secondary hover:text-white transition-all cursor-default shadow-sm"
              style={{ fontFamily: 'Plus Jakarta Sans' }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Scrolls Right */}
      <div className="relative w-full flex overflow-hidden group">
        <div 
          className="flex w-max gap-12 group-hover:[animation-play-state:paused]" 
          style={{ animation: 'scrollRight 35s linear infinite' }}
        >
          {row2Duplicated.map((name, i) => (
            <div
              key={`r2-${i}`}
              className="font-semibold text-sm text-card px-6 py-2 border border-white/10 rounded-full whitespace-nowrap hover:border-secondary hover:text-white transition-all cursor-default shadow-sm"
              style={{ fontFamily: 'Plus Jakarta Sans' }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scrollLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
