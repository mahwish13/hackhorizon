const testimonials = [
    ['Priya Sharma', 'CFO, NexTrade Solutions', 'P', 'InvoiceSync cut our invoice processing time by 60%. The buyer collaboration portal became a genuine differentiator for our team.'],
    ['Arjun Mehta', 'Founder, SupplyBridge India', 'A', 'We handle 300+ invoices every month across 50 buyers. Everything now stays organized and GST reviews no longer derail the quarter.'],
    ['Sneha Patil', 'Head of Finance, Orbis Manufacturing', 'S', 'The real-time analytics finally gave leadership clean visibility into collections and working capital movement.'],
    ['Rajesh Kumar', 'Director, Vertex Exports', 'R', 'Switching from manual spreadsheets was seamless. Automated reminders alone helped us recover over Rs15L in outstanding dues.'],
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="bg-[linear-gradient(180deg,#f5f8ea_0%,#ecf4dc_100%)] py-24">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.26em] text-primary">Testimonials</p>
                    <h2 className="mt-4 font-heading text-4xl font-extrabold leading-tight text-dark sm:text-5xl">
                        Loved by finance teams across India.
                    </h2>
                </div>

                <div className="mt-14 grid gap-6 lg:grid-cols-2">
                    {testimonials.map(([name, roleText, avatar, text], index) => (
                        <div key={name} className={`rounded-[2rem] border p-7 shadow-[0_18px_40px_rgba(55,85,52,0.06)] ${
                            index % 2 === 0 ? 'border-white/10 bg-[#0c2218] text-white' : 'border-[#c8d7bc] bg-white/78 text-dark'
                        }`}>
                            <div className="flex gap-1 text-primary">
                                {Array.from({ length: 5 }).map((_, starIndex) => (
                                    <svg key={starIndex} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>
                            <p className={`mt-5 text-lg leading-8 ${index % 2 === 0 ? 'text-white/72' : 'text-secondary'}`}>
                                "{text}"
                            </p>
                            <div className="mt-8 flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                                    {avatar}
                                </div>
                                <div>
                                    <p className={`font-heading text-lg font-bold ${index % 2 === 0 ? 'text-white' : 'text-dark'}`}>{name}</p>
                                    <p className={`text-sm ${index % 2 === 0 ? 'text-white/45' : 'text-secondary'}`}>{roleText}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
