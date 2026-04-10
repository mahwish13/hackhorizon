import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const backendOrigin = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/api\/?$/, '');

    const [role, setRole] = useState('seller');
    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            navigate(user.role === 'buyer' ? '/buyer-dashboard' : '/seller-dashboard', { replace: true });
        }
    }, [navigate, user]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            window.location.href = `${backendOrigin}/api/auth/google?role=${role}`;
        } catch (err) {
            console.error('Failed to start authentication:', err);
            setError('Could not open secure sign-in. Please try again.');
            setLoading(false);
        }
    };

    const demoLogin = (demoRole) => {
        setRole(demoRole);
        setError('');
        setForm({
            email: demoRole === 'seller' ? 'seller@invoicesync.io' : 'buyer@invoicesync.io',
            password: '••••••••',
        });
    };

    const highlights = [
        { label: 'Invoice match rate', value: '99.2%' },
        { label: 'GST sync latency', value: '< 2 min' },
        { label: 'Teams onboarded', value: '540+' },
    ];

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#071b12] text-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(107,144,113,0.25),_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(174,195,176,0.12),_transparent_22%),linear-gradient(160deg,_#071b12_0%,_#0b2a1c_50%,_#06150f_100%)]" />
            <div className="dynamic-float absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
            <div className="dynamic-float-delayed absolute right-0 top-0 h-80 w-80 rounded-full bg-secondary/15 blur-[140px]" />
            <div className="dynamic-float-slow absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-card/10 blur-[120px]" />

            <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 lg:px-10">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-heading text-xl font-bold">InvoiceSync</p>
                            <p className="text-xs uppercase tracking-[0.28em] text-white/35">Workspace access</p>
                        </div>
                    </Link>

                    <Link to="/" className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-white/20 hover:text-white">
                        Back to home
                    </Link>
                </div>

                <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
                    <section className="hidden lg:flex lg:flex-col lg:justify-center lg:pr-6">
                        <div className="max-w-2xl">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#d8e7d7] backdrop-blur-xl">
                                <span className="h-2 w-2 rounded-full bg-[#9ad39e]" />
                                Live collaboration layer
                            </div>
                            <h1 className="max-w-3xl font-heading text-5xl font-extrabold leading-[0.98] text-white xl:text-6xl">
                                A faster, smarter workspace for B2B invoicing.
                            </h1>
                            <p className="mt-6 max-w-xl text-lg leading-8 text-white/66">
                                Centralize vendor requests, automate GST visibility, and keep every approval moving with a more responsive finance cockpit.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-4 sm:grid-cols-3">
                            {highlights.map(({ label, value }) => (
                                <div key={label} className="rounded-3xl border border-white/10 bg-white/7 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
                                    <p className="font-heading text-3xl font-extrabold text-white">{value}</p>
                                    <p className="mt-2 text-sm text-white/50">{label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="relative mt-10 max-w-2xl rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_35px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
                            <div className="dynamic-float absolute -right-8 -top-8 w-44 rounded-[1.6rem] border border-[#8cb78f]/25 bg-[#112d1e]/85 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
                                <p className="text-xs uppercase tracking-[0.22em] text-[#97bf97]">This week</p>
                                <p className="mt-2 font-heading text-3xl font-bold text-white">Rs4.8Cr</p>
                                <p className="mt-1 text-sm text-white/45">Invoices reconciled</p>
                            </div>
                            <p className="text-xs uppercase tracking-[0.26em] text-white/35">Ops Snapshot</p>
                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl border border-white/8 bg-[#0f261a]/80 p-4">
                                    <p className="text-sm text-white/45">Approval queue</p>
                                    <p className="mt-3 font-heading text-4xl font-bold">18</p>
                                    <p className="mt-2 text-sm text-[#9bd29f]">6 urgent vendor requests in motion</p>
                                </div>
                                <div className="rounded-2xl border border-white/8 bg-[#0f261a]/80 p-4">
                                    <p className="text-sm text-white/45">GST watch</p>
                                    <p className="mt-3 font-heading text-4xl font-bold">24h</p>
                                    <p className="mt-2 text-sm text-[#d7e8d6]">Till next return review checkpoint</p>
                                </div>
                            </div>
                            <div className="mt-5 flex items-center gap-3 text-sm text-white/50">
                                <span className="h-2.5 w-2.5 rounded-full bg-[#97bf97] shadow-[0_0_0_6px_rgba(151,191,151,0.14)]" />
                                Dynamic workspace signals update in real time
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto flex w-full max-w-xl items-center">
                        <div className="w-full rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 shadow-[0_35px_100px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-8">
                            <div className="mb-7">
                                <p className="text-sm uppercase tracking-[0.24em] text-white/35">Access your workspace</p>
                                <h2 className="mt-3 font-heading text-4xl font-extrabold text-white">Welcome back</h2>
                                <p className="mt-2 text-base text-white/50">Sign in to your InvoiceSync workspace</p>
                            </div>

                            <div className="mb-3 grid grid-cols-2 gap-2 rounded-2xl border border-white/8 bg-black/10 p-1.5">
                                {['seller', 'buyer'].map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => setRole(r)}
                                        className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${role === r ? 'bg-primary text-white shadow-[0_8px_30px_rgba(55,85,52,0.45)]' : 'text-white/55 hover:text-white'}`}
                                    >
                                        {r === 'seller' ? 'Seller' : 'Buyer'}
                                    </button>
                                ))}
                            </div>

                            <div className="mb-6 grid grid-cols-2 gap-2">
                                {['seller', 'buyer'].map((r) => (
                                    <button
                                        key={r}
                                        type="button"
                                        onClick={() => demoLogin(r)}
                                        className="rounded-xl border border-white/8 bg-white/4 px-4 py-2.5 text-sm text-white/50 transition hover:border-white/15 hover:bg-white/8 hover:text-white/80"
                                    >
                                        Try demo {r}
                                    </button>
                                ))}
                            </div>

                            {error ? (
                                <div className="mb-5 rounded-2xl border border-red-500/35 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                                    {error}
                                </div>
                            ) : null}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-white/42">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="you@company.com"
                                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-base text-white outline-none transition placeholder:text-white/18 focus:border-[#98c295] focus:bg-white/7"
                                    />
                                </div>

                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <label className="block text-xs font-semibold uppercase tracking-[0.24em] text-white/42">
                                            Password
                                        </label>
                                        <button type="button" className="text-sm text-secondary transition hover:text-card">
                                            Forgot password?
                                        </button>
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your password"
                                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-base text-white outline-none transition placeholder:text-white/18 focus:border-[#98c295] focus:bg-white/7"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-2xl bg-primary px-5 py-3.5 font-heading text-xl font-bold text-white shadow-[0_16px_40px_rgba(55,85,52,0.42)] transition hover:bg-[#436840] disabled:cursor-not-allowed disabled:opacity-80"
                                >
                                    {loading ? 'Opening secure sign-in...' : `Sign in as ${role === 'seller' ? 'Seller' : 'Buyer'}`}
                                </button>
                            </form>

                            <p className="mt-4 text-sm text-white/42">
                                Secure sign-in continues through your organization account after this step.
                            </p>

                            <p className="mt-3 text-center text-sm text-white/32">
                                Don&apos;t have an account?{' '}
                                <button type="button" className="font-medium text-secondary transition hover:text-card">
                                    Request access
                                </button>
                            </p>
                        </div>
                    </section>
                </div>

                <p className="text-center text-sm text-white/24">
                    © 2026 InvoiceSync. Built for finance teams that move fast.
                </p>
            </div>
        </div>
    );
}
