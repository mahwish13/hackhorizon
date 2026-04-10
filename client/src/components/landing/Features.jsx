const features = [
    ['Smart invoice builder', 'Create GST-compliant invoices in seconds with reusable templates, tax automation, and instant exports.'],
    ['Buyer-seller collaboration', 'Approvals, disputes, and clarifications happen inside one clean workflow instead of scattered emails.'],
    ['Real-time analytics', 'Track cash flow, overdue invoices, and GST summaries with live charts and fast operational insight.'],
    ['Payment tracking', 'Stay synced with payment updates from gateways, bank feeds, and status reminders.'],
    ['GST compliance engine', 'Auto-compute IGST, CGST, and SGST with clean filing-ready summaries.'],
    ['Smart notifications', 'Nudge stakeholders at the right time with reminders, alerts, and follow-up events.'],
];

export default function Features() {
    return (
        <section id="features" className="bg-[linear-gradient(180deg,#eff6df_0%,#edf3da_100%)] py-24 text-dark">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-bold uppercase tracking-[0.24em] text-primary">Features</p>
                    <h2 className="mt-4 font-heading text-4xl font-extrabold leading-tight sm:text-5xl">
                        Everything you need to manage B2B invoicing.
                    </h2>
                    <p className="mt-5 text-lg leading-8 text-secondary">
                        From invoice creation to payment visibility, the whole workflow stays aligned, auditable, and easy to act on.
                    </p>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {features.map(([title, text], index) => (
                        <div key={title} className="group rounded-[2rem] border border-[#c8d7bc] bg-white/72 p-7 shadow-[0_18px_40px_rgba(55,85,52,0.06)] transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_24px_50px_rgba(55,85,52,0.12)]">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 font-heading text-lg font-bold text-primary">
                                {String(index + 1).padStart(2, '0')}
                            </div>
                            <h3 className="mt-6 font-heading text-2xl font-bold">{title}</h3>
                            <p className="mt-3 text-base leading-8 text-secondary">{text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
