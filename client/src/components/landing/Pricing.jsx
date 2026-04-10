import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const CheckIcon = () => (
    <svg className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#4ade80]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
    </svg>
  );

  const plans = [
    {
      name: 'Starter',
      desc: 'Perfect for small businesses trying out B2B invoicing',
      monthlyPrice: '₹0',
      yearlyPrice: '₹0',
      cta: 'Get Started Free',
      ctaLink: '/register',
      featured: false,
      features: ['Up to 50 invoices/month', '1 seller account', '1 buyer account', 'Basic GST summary', 'Email support']
    },
    {
      name: 'Growth',
      desc: 'For growing businesses with regular B2B transactions',
      monthlyPrice: '₹1,499',
      yearlyPrice: '₹1,199',
      cta: 'Start Free Trial',
      ctaLink: '/register',
      featured: true,
      features: ['Unlimited invoices', '5 seller accounts', 'Unlimited buyer accounts', 'Full GST dashboard & charts', 'Invoice request feature', 'Payment tracking', 'Priority support']
    },
    {
      name: 'Enterprise',
      desc: 'For large organizations with complex invoice workflows',
      monthlyPrice: 'Custom',
      yearlyPrice: 'Custom',
      cta: 'Contact Sales',
      ctaLink: '/register',
      featured: false,
      features: ['Everything in Growth', 'Dedicated account manager', 'Custom GSTIN configurations', 'API access', 'SSO and team management', 'SLA guarantee']
    }
  ];

  return (
    <section id="pricing" className="bg-[#0a0f0d] py-28 px-6 md:px-10 relative overflow-hidden">
      {/* top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#4ade80]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 border border-[#4ade80]/20 bg-[#4ade80]/8 text-[#4ade80] rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
            Simple pricing
          </div>
          <h2
            className="text-[clamp(1.8rem,4vw,2.75rem)] font-extrabold text-white leading-tight mb-4"
            style={{ fontFamily: 'Plus Jakarta Sans' }}
          >
            Pay for what you use
          </h2>
          <p className="text-[#6b8f76] text-base max-w-md mx-auto leading-relaxed mb-10">
            No hidden fees. No setup costs. Start free and scale as your business grows.
          </p>

          {/* Toggle */}
          <div className="inline-flex bg-[#111a15] rounded-full p-1 border border-[#243124]">
            <button
              onClick={() => setIsYearly(false)}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                !isYearly
                  ? 'bg-[#4ade80] text-[#0a0f0d] shadow-lg shadow-[#4ade80]/25'
                  : 'text-[#6b8f76] hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                isYearly
                  ? 'bg-[#4ade80] text-[#0a0f0d] shadow-lg shadow-[#4ade80]/25'
                  : 'text-[#6b8f76] hover:text-white'
              }`}
            >
              Yearly
              <span className="text-[10px] font-extrabold bg-[#4ade80]/20 text-[#4ade80] px-1.5 py-0.5 rounded-md border border-[#4ade80]/30 leading-none">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-8 border transition-all duration-300 ${
                plan.featured
                  ? 'bg-[#111a15] border-[#4ade80]/40 shadow-2xl shadow-[#4ade80]/10 md:scale-[1.04] z-10'
                  : 'bg-[#111a15] border-[#243124] hover:border-[#2e4030]'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#4ade80] text-[#0a0f0d] text-[10px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-[#4ade80]/30 whitespace-nowrap">
                  Most Popular
                </div>
              )}

              <h3 className="font-bold text-xl text-white mb-1 text-center" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                {plan.name}
              </h3>
              <p className="text-xs text-[#6b8f76] leading-relaxed min-h-[36px] mb-6 text-center">{plan.desc}</p>

              <div className="flex items-end justify-center gap-1 mb-8">
                <span
                  className="text-[2.75rem] font-extrabold text-white leading-none tracking-tight"
                  style={{ fontFamily: 'Plus Jakarta Sans' }}
                >
                  {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                {plan.monthlyPrice !== 'Custom' && (
                  <span className="text-sm text-[#6b8f76] mb-1">/month</span>
                )}
              </div>

              <Link
                to={plan.ctaLink}
                className={`w-full text-center block rounded-xl py-3.5 text-sm font-bold transition-all duration-300 mb-8 ${
                  plan.featured
                    ? 'bg-[#4ade80] text-[#0a0f0d] hover:bg-[#86efac] shadow-lg shadow-[#4ade80]/25 hover:shadow-[#4ade80]/40'
                    : 'bg-[#192319] text-white border border-[#2e4030] hover:border-[#4ade80]/30 hover:bg-[#243124]'
                }`}
                style={{ fontFamily: 'Plus Jakarta Sans' }}
              >
                {plan.cta}
              </Link>

              <div className="flex flex-col items-center gap-3.5">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex gap-2 text-sm items-center text-center">
                    <CheckIcon />
                    <span className={plan.featured ? 'text-[#e8f5ec]' : 'text-[#6b8f76]'}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-[#3d5945] font-semibold tracking-wide">
          All plans include a 14-day free trial. No credit card required.
        </div>
      </div>
    </section>
  );
}
