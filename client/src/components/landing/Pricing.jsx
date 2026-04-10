import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const CheckIcon = ({ className }) => (
    <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <section id="pricing" className="bg-bg py-24 px-6 md:px-10">
      {/* Header */}
      <div className="text-center mb-16 max-w-2xl mx-auto flex flex-col items-center">
        <div className="bg-dark/10 text-dark rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-6">
          Simple pricing
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-dark leading-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
          Pay for what you use
        </h2>
        <p className="text-sm text-secondary mt-3 leading-relaxed" style={{ fontFamily: 'Inter' }}>
          No hidden fees. No setup costs. Start free and scale as your business grows.
        </p>

        {/* Toggle */}
        <div className="mt-8 inline-flex bg-card/40 rounded-full p-1 border border-card/60">
          <button
            onClick={() => setIsYearly(false)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
              !isYearly ? 'bg-dark text-white shadow-md' : 'text-dark hover:text-dark/70'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 ${
              isYearly ? 'bg-dark text-white shadow-md' : 'text-dark hover:text-dark/70'
            }`}
          >
            Yearly <span className="ml-1 text-xs text-primary font-bold bg-white/20 px-1.5 rounded-md">-20%</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-center">
        
        {/* Card 1: Starter */}
        <div className="bg-white border border-card/60 rounded-2xl p-8 flex flex-col h-full hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-xl text-dark" style={{ fontFamily: 'Plus Jakarta Sans' }}>Starter</h3>
          <p className="text-xs text-secondary mt-2 min-h-[32px]">Perfect for small businesses trying out B2B invoicing</p>
          
          <div className="mt-6 mb-8 flex items-end">
            <span className="text-5xl font-extrabold text-dark tracking-tight">₹0</span>
            <span className="text-sm text-secondary font-medium ml-1 mb-1.5">/month</span>
          </div>

          <Link to="/register" className="w-full text-center block bg-card text-dark rounded-xl py-3 font-semibold hover:bg-secondary hover:text-white transition-colors">
            Get Started Free
          </Link>

          <div className="mt-8 flex flex-col gap-3.5">
            {[
              "Up to 50 invoices/month",
              "1 seller account",
              "1 buyer account",
              "Basic GST summary",
              "Email support"
            ].map((feature, i) => (
              <div key={i} className="flex gap-3 text-sm text-dark font-medium">
                <CheckIcon className="text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Growth (Featured) */}
        <div className="bg-dark border-2 border-primary rounded-2xl p-8 flex flex-col relative md:scale-105 shadow-2xl z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
            Most Popular
          </div>
          
          <h3 className="font-bold text-xl text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>Growth</h3>
          <p className="text-xs text-secondary/90 mt-2 min-h-[32px]">For growing businesses with regular B2B transactions</p>
          
          <div className="mt-6 mb-8 flex items-end">
            <span className="text-5xl font-extrabold text-white tracking-tight">
              {isYearly ? '₹1,199' : '₹1,499'}
            </span>
            <span className="text-sm text-secondary font-medium ml-1 mb-1.5">/month</span>
          </div>

          <Link to="/register" className="w-full text-center block bg-primary text-white rounded-xl py-3 font-semibold hover:bg-primary/80 hover:shadow-lg hover:shadow-primary/20 transition-all">
            Start Free Trial
          </Link>

          <div className="mt-8 flex flex-col gap-3.5">
            {[
              "Unlimited invoices",
              "5 seller accounts",
              "Unlimited buyer accounts",
              "Full GST dashboard with charts",
              "Invoice request feature",
              "Payment tracking",
              "Priority support"
            ].map((feature, i) => (
              <div key={i} className="flex gap-3 text-sm text-card font-medium">
                <CheckIcon className="text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Enterprise */}
        <div className="bg-white border border-card/60 rounded-2xl p-8 flex flex-col h-full hover:shadow-lg transition-shadow">
          <h3 className="font-bold text-xl text-dark" style={{ fontFamily: 'Plus Jakarta Sans' }}>Enterprise</h3>
          <p className="text-xs text-secondary mt-2 min-h-[32px]">For large organizations with complex invoice workflows</p>
          
          <div className="mt-6 mb-8 flex items-end">
            <span className="text-5xl font-extrabold text-dark tracking-tight">Custom</span>
          </div>

          <Link to="/register" className="w-full text-center block bg-dark text-white rounded-xl py-3 font-semibold hover:bg-primary transition-colors">
            Contact Sales
          </Link>

          <div className="mt-8 flex flex-col gap-3.5">
            {[
              "Everything in Growth",
              "Dedicated account manager",
              "Custom GSTIN configurations",
              "API access",
              "SSO and team management",
              "SLA guarantee"
            ].map((feature, i) => (
              <div key={i} className="flex gap-3 text-sm text-dark font-medium">
                <CheckIcon className="text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Text */}
      <div className="mt-12 text-center text-xs font-medium text-secondary">
        All plans include 14-day free trial. No credit card required.
      </div>
    </section>
  );
}
