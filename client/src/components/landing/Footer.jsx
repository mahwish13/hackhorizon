import { Link } from 'react-router-dom';

const links = {
    Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
    Company: ['About', 'Careers', 'Blog', 'Press'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
    Support: ['Help Centre', 'API Docs', 'Status', 'Contact'],
};

export default function Footer() {
    return (
        <footer className="bg-[#081d14] text-white">
            <div className="border-t border-white/8">
                <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 sm:px-6 lg:flex-row lg:items-center lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#8bb28c]">Ready to move faster</p>
                        <h3 className="mt-4 font-heading text-4xl font-extrabold leading-tight">
                            Ready to sync your invoicing?
                        </h3>
                        <p className="mt-4 text-lg text-white/52">
                            Start your 14-day trial and bring approvals, compliance, and cash visibility into one workflow.
                        </p>
                    </div>
                    <Link to="/login" className="rounded-full border border-primary bg-primary px-7 py-4 font-heading text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#436840]">
                        Get started for free
                    </Link>
                </div>
            </div>

            <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-heading text-2xl font-extrabold">InvoiceSync</p>
                                <p className="text-xs uppercase tracking-[0.26em] text-white/32">B2B finance workspace</p>
                            </div>
                        </div>
                        <p className="mt-5 text-sm leading-7 text-white/42">
                            Built for modern Indian businesses that need better alignment across invoicing, payments, and GST workflows.
                        </p>
                    </div>

                    {Object.entries(links).map(([group, items]) => (
                        <div key={group}>
                            <h4 className="text-xs font-bold uppercase tracking-[0.24em] text-white/42">{group}</h4>
                            <ul className="mt-5 space-y-3">
                                {items.map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-sm text-white/48 transition hover:text-white">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-14 flex flex-col gap-3 border-t border-white/8 pt-6 text-sm text-white/28 md:flex-row md:items-center md:justify-between">
                    <p>© 2026 InvoiceSync. All rights reserved.</p>
                    <p>Built for Indian finance teams.</p>
                </div>
            </div>
        </footer>
    );
}
