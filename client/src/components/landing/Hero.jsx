import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button';

const stats = [
    { value: '10K+', label: 'Invoices processed' },
    { value: '98%', label: 'Uptime SLA' },
    { value: '540+', label: 'Finance teams onboarded' },
    { value: '4.9/5', label: 'Average rating' },
];

export default function Hero() {
    const navigate = useNavigate();

    return (
        <section className="relative overflow-hidden bg-[#071b12] pt-32 text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(107,144,113,0.28),transparent_28%),radial-gradient(circle_at_80%_22%,rgba(174,195,176,0.14),transparent_20%),linear-gradient(180deg,#082115_0%,#071b12_100%)]" />
            <div className="dynamic-float absolute left-12 top-28 h-56 w-56 rounded-full bg-primary/18 blur-[110px]" />
            <div className="dynamic-float-delayed absolute right-10 top-36 h-72 w-72 rounded-full bg-secondary/10 blur-[140px]" />

            <div className="relative mx-auto grid w-full max-w-7xl gap-16 px-5 pb-24 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-28">
                <div className="flex max-w-3xl flex-col justify-center">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#d7e7d6] backdrop-blur-xl">
                        <span className="h-2 w-2 rounded-full bg-[#98c295]" />
                        B2B invoice collaboration platform
                    </div>

                    <h1 className="mt-8 max-w-4xl font-heading text-5xl font-extrabold leading-[0.95] text-white sm:text-6xl xl:text-7xl">
                        Sync invoices.
                        <span className="bg-[linear-gradient(135deg,#dfe9de,#89b18a)] bg-clip-text text-transparent"> Close deals.</span>
                        <br />
                        Grow faster.
                    </h1>

                    <p className="mt-7 max-w-2xl text-lg leading-8 text-white/62 sm:text-xl">
                        InvoiceSync gives finance teams a live workspace for invoice approvals, GST visibility, payment tracking, and buyer-seller collaboration.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                        <Button
                            size="lg"
                            variant="primary"
                            onClick={() => navigate('/login')}
                            icon={
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            }
                        >
                            Start Free Trial
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            icon={
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                                    <path d="M8 6l10 6-10 6V6z" fill="currentColor" />
                                </svg>
                            }
                        >
                            Watch Demo
                        </Button>
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
                                <p className="font-heading text-3xl font-extrabold text-white">{stat.value}</p>
                                <p className="mt-1 text-sm text-white/46">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-end justify-center lg:justify-end">
                    <div className="relative w-full max-w-[560px] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5 shadow-[0_35px_120px_rgba(0,0,0,0.42)] backdrop-blur-2xl">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.24em] text-white/35">Live dashboard</p>
                                <h2 className="mt-2 font-heading text-3xl font-bold">Finance command center</h2>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-right">
                                <p className="text-xs uppercase tracking-[0.22em] text-white/35">Recovered</p>
                                <p className="mt-1 font-heading text-2xl font-bold text-[#dff0dd]">Rs1.8Cr</p>
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-3">
                            {[
                                ['Pending approvals', '18'],
                                ['Paid this week', '142'],
                                ['GST flagged', '03'],
                            ].map(([label, value]) => (
                                <div key={label} className="rounded-2xl border border-white/8 bg-[#0d2419] p-4">
                                    <p className="text-sm text-white/45">{label}</p>
                                    <p className="mt-3 font-heading text-3xl font-bold">{value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-white/8 bg-[#0b2117]">
                            <div className="grid grid-cols-[1.3fr_1fr_0.9fr] border-b border-white/6 px-5 py-3 text-xs uppercase tracking-[0.22em] text-white/30">
                                <span>Buyer</span>
                                <span>Amount</span>
                                <span>Status</span>
                            </div>
                            {[
                                ['Reliance Industries', 'Rs1,24,000', 'Paid'],
                                ['Tata Consultancy', 'Rs87,500', 'Pending'],
                                ['Infosys Ltd.', 'Rs2,03,400', 'Overdue'],
                                ['Wipro Technologies', 'Rs56,200', 'Draft'],
                            ].map(([buyer, amount, status]) => (
                                <div key={buyer} className="grid grid-cols-[1.3fr_1fr_0.9fr] items-center border-b border-white/6 px-5 py-4 text-sm last:border-b-0">
                                    <span className="font-medium text-white/88">{buyer}</span>
                                    <span className="text-white/72">{amount}</span>
                                    <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                                        status === 'Paid'
                                            ? 'bg-[#1c4e30] text-[#b8ecb8]'
                                            : status === 'Pending'
                                                ? 'bg-[#4a4317] text-[#f5d76c]'
                                                : status === 'Overdue'
                                                    ? 'bg-[#4f2020] text-[#ff9b9b]'
                                                    : 'bg-white/8 text-white/55'
                                    }`}>
                                        {status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
