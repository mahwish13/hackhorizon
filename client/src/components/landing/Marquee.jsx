const logos = [
    'Zoho Books', 'Tally ERP', 'QuickBooks', 'FreshBooks', 'Wave', 'Xero',
    'Razorpay', 'Stripe', 'PayU', 'ClearTax', 'Instamojo', 'BillDesk',
];

export default function Marquee() {
    return (
        <section className="overflow-hidden border-y border-white/8 bg-[#081d14] py-6">
            <div className="mx-auto mb-4 w-full max-w-7xl px-5 text-center sm:px-6 lg:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/35">
                    Trusted integrations and partners
                </p>
            </div>
            <div className="marquee-track flex w-max items-center gap-10 text-white/45">
                {[...logos, ...logos, ...logos].map((logo, index) => (
                    <div key={`${logo}-${index}`} className="flex items-center gap-3 whitespace-nowrap">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/8 text-sm font-bold text-white/70">
                            {logo[0]}
                        </div>
                        <span className="text-sm font-medium">{logo}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
