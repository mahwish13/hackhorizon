const reasons = [
    ['01', 'Built for Indian B2B', 'GST-native, INR-first, with TDS handling, e-way bill support, and MSME-friendly workflows from day one.'],
    ['02', 'Real collaboration, not just sharing', 'Buyers and sellers work in one workspace to approve, dispute, and resolve invoices without leaving context.'],
    ['03', 'No setup headaches', 'Connect Tally or Zoho Books data quickly and get to value without a heavyweight implementation cycle.'],
    ['04', 'Enterprise-grade security', 'Audit trails, role-based access, encrypted sessions, and robust controls keep finance teams comfortable.'],
];

export default function WhyUs() {
    return (
        <section id="why-us" className="bg-[#081d14] py-24 text-white">
            <div className="mx-auto grid w-full max-w-7xl items-start gap-12 px-5 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
                <div className="lg:sticky lg:top-28">
                    <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#8bb28c]">Why InvoiceSync</p>
                    <h2 className="mt-4 font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
                        More than another invoicing tool.
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-white/58">
                        Most products stop at invoice creation. InvoiceSync is designed for the full finance motion: creation, review, reconciliation, compliance, and cash visibility.
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                        <div className="flex -space-x-2">
                            {['R', 'T', 'A', 'S'].map((letter) => (
                                <div key={letter} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#081d14] bg-primary/80 text-sm font-bold text-white">
                                    {letter}
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-white/48">Trusted by 500+ Indian businesses</p>
                    </div>
                </div>

                <div className="grid gap-5">
                    {reasons.map(([num, title, text]) => (
                        <div key={num} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-white/18 hover:bg-white/7">
                            <div className="grid gap-4 md:grid-cols-[92px_1fr] md:items-start">
                                <div className="font-heading text-5xl font-black text-primary/32">{num}</div>
                                <div>
                                    <h3 className="font-heading text-2xl font-bold text-white">{title}</h3>
                                    <p className="mt-3 text-base leading-8 text-white/52">{text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
