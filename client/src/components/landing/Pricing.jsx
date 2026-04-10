import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button';

const plans = [
    {
        name: 'Starter',
        price: { monthly: 'Rs999', yearly: 'Rs799' },
        desc: 'For freelancers and lean teams getting started.',
        features: ['Up to 50 invoices / month', '2 team members', 'GST computation', 'PDF export', 'Email support'],
        cta: 'Get Started',
        popular: false,
    },
    {
        name: 'Growth',
        price: { monthly: 'Rs2,499', yearly: 'Rs1,999' },
        desc: 'For growing businesses that need collaboration and visibility.',
        features: ['Unlimited invoices', '10 team members', 'Buyer collaboration portal', 'Payment integrations', 'Analytics dashboard', 'Priority support'],
        cta: 'Start Free Trial',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: { monthly: 'Custom', yearly: 'Custom' },
        desc: 'For teams with compliance, security, and integration needs.',
        features: ['Unlimited everything', 'Custom roles and permissions', 'ERP integrations', 'Dedicated account manager', 'SLA guarantee', 'SSO and audit logs'],
        cta: 'Contact Sales',
        popular: false,
    },
];

export default function Pricing() {
    const [yearly, setYearly] = useState(false);
    const navigate = useNavigate();

    return (
        <section id="pricing" className="bg-[linear-gradient(180deg,#edf3da_0%,#f5f8ea_100%)] py-24">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">Pricing</p>
                    <h2 className="mt-4 font-heading text-4xl font-extrabold leading-tight text-dark sm:text-5xl">
                        Simple, transparent pricing.
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-secondary">
                        No hidden fees, no confusing packaging. Pick the workflow that matches your team.
                    </p>

                    <div className="mt-8 inline-flex rounded-full border border-[#c8d7bc] bg-white/80 p-1.5 shadow-[0_16px_35px_rgba(55,85,52,0.06)]">
                        <button type="button" onClick={() => setYearly(false)} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${!yearly ? 'bg-dark text-white' : 'text-secondary hover:text-dark'}`}>
                            Monthly
                        </button>
                        <button type="button" onClick={() => setYearly(true)} className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${yearly ? 'bg-dark text-white' : 'text-secondary hover:text-dark'}`}>
                            Yearly
                            <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-[11px] text-white">-20%</span>
                        </button>
                    </div>
                </div>

                <div className="mt-14 grid gap-6 lg:grid-cols-3">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative flex h-full flex-col rounded-[2rem] border p-8 ${
                                plan.popular
                                    ? 'border-primary bg-[#0d2419] text-white shadow-[0_25px_70px_rgba(55,85,52,0.22)]'
                                    : 'border-[#c8d7bc] bg-white/78 text-dark shadow-[0_18px_40px_rgba(55,85,52,0.06)]'
                            }`}
                        >
                            {plan.popular ? (
                                <span className="absolute left-8 top-0 -translate-y-1/2 rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white">
                                    Most popular
                                </span>
                            ) : null}

                            <div>
                                <h3 className="font-heading text-3xl font-bold">{plan.name}</h3>
                                <p className={`mt-3 text-base leading-7 ${plan.popular ? 'text-white/55' : 'text-secondary'}`}>{plan.desc}</p>
                                <div className="mt-8 flex items-end gap-2">
                                    <span className="font-heading text-5xl font-extrabold">
                                        {yearly ? plan.price.yearly : plan.price.monthly}
                                    </span>
                                    {plan.price.monthly !== 'Custom' ? (
                                        <span className={`pb-2 text-sm ${plan.popular ? 'text-white/45' : 'text-secondary'}`}>/mo</span>
                                    ) : null}
                                </div>
                            </div>

                            <ul className="mt-8 flex flex-1 flex-col gap-4">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <span className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full ${plan.popular ? 'bg-white/10 text-[#b8ecb8]' : 'bg-primary/10 text-primary'}`}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span className={`text-base ${plan.popular ? 'text-white/75' : 'text-secondary'}`}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-8">
                                <Button variant={plan.popular ? 'primary' : 'dark'} className="w-full" onClick={() => navigate('/login')}>
                                    {plan.cta}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
