export default function DashboardPreview() {
    return (
        <section className="bg-[#081d14] py-24 text-white">
            <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#8bb28c]">Control tower</p>
                    <h2 className="mt-4 font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
                        A dashboard built for clarity.
                    </h2>
                    <p className="mt-5 max-w-xl text-lg leading-8 text-white/58">
                        Track every invoice, every rupee, and every approval state in one live view instead of juggling spreadsheets and follow-up messages.
                    </p>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {[
                            ['Multi-party approval flow', 'Buyer actions, seller updates, and comments stay in one thread.'],
                            ['Live GST visibility', 'See collected, payable, and overdue status at a glance.'],
                        ].map(([title, text]) => (
                            <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                                <h3 className="font-heading text-lg font-bold">{title}</h3>
                                <p className="mt-2 text-sm leading-7 text-white/48">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
                    <div className="mb-5 flex items-center justify-between">
                        <div className="flex gap-2">
                            <span className="h-3 w-3 rounded-full bg-[#ff6b6b]" />
                            <span className="h-3 w-3 rounded-full bg-[#f4cf57]" />
                            <span className="h-3 w-3 rounded-full bg-[#65d07d]" />
                        </div>
                        <div className="rounded-full border border-white/8 bg-white/6 px-4 py-1.5 text-xs text-white/35">
                            app.invoicesync.io/dashboard
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-4">
                        {[
                            ['Total revenue', 'Rs8.4L', '+12.5%'],
                            ['Paid', '142', '+8'],
                            ['Pending', '23', '-3'],
                            ['Overdue', '5', '+2'],
                        ].map(([label, value, delta]) => (
                            <div key={label} className="rounded-2xl border border-white/8 bg-[#0d2419] p-4">
                                <p className="text-xs uppercase tracking-[0.2em] text-white/30">{label}</p>
                                <p className="mt-3 font-heading text-3xl font-bold">{value}</p>
                                <p className="mt-1 text-sm text-[#9fc99f]">{delta} this month</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-white/8">
                        <div className="grid grid-cols-[0.85fr_1.35fr_1fr_0.85fr_0.9fr] bg-[#10281c] px-5 py-3 text-xs uppercase tracking-[0.22em] text-white/30">
                            <span>Invoice</span>
                            <span>Client</span>
                            <span>Amount</span>
                            <span>Status</span>
                            <span>Date</span>
                        </div>
                        {[
                            ['INV-2401', 'Reliance Industries', 'Rs1,24,000', 'Paid', '10 Apr 2026'],
                            ['INV-2402', 'Tata Consultancy', 'Rs87,500', 'Pending', '09 Apr 2026'],
                            ['INV-2403', 'Infosys Ltd.', 'Rs2,03,400', 'Overdue', '05 Apr 2026'],
                            ['INV-2404', 'Wipro Technologies', 'Rs56,200', 'Draft', '03 Apr 2026'],
                        ].map(([invoice, client, amount, status, date]) => (
                            <div key={invoice} className="grid grid-cols-[0.85fr_1.35fr_1fr_0.85fr_0.9fr] items-center border-t border-white/6 bg-[#0a2016] px-5 py-4 text-sm">
                                <span className="font-mono text-white/70">{invoice}</span>
                                <span className="font-medium text-white">{client}</span>
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
                                <span className="text-white/42">{date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
