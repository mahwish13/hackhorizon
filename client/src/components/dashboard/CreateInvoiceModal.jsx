import { useState } from 'react';
import api from '../../api/axios';
import Button from '../shared/Button';

export default function CreateInvoiceModal({ onClose, onCreated }) {
    const [form, setForm] = useState({
        invoiceNumber: '',
        buyerGstin: '',
        amount: '',
        date: '',
        tax: { cgst: '', sgst: '', igst: '' },
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handle = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('tax.')) {
            const key = name.split('.')[1];
            setForm((f) => ({ ...f, tax: { ...f.tax, [key]: value } }));
        } else {
            setForm((f) => ({ ...f, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await api.post('/invoices', {
                invoiceNumber: form.invoiceNumber,
                buyerGstin: form.buyerGstin.toUpperCase(),
                amount: Number(form.amount),
                date: form.date,
                tax: {
                    cgst: Number(form.tax.cgst) || 0,
                    sgst: Number(form.tax.sgst) || 0,
                    igst: Number(form.tax.igst) || 0,
                },
            });
            onCreated();
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to create invoice.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto" style={{ animation: 'animateIn 0.2s ease-out' }}>
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-card/30">
                    <h2 className="font-bold text-dark text-lg" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                        New Invoice
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-bg hover:bg-card/40 flex items-center justify-center text-secondary hover:text-dark transition-all"
                    >
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl px-4 py-3">
                            {error}
                        </div>
                    )}

                    {[
                        { label: 'Invoice Number', name: 'invoiceNumber', type: 'text', placeholder: 'INV-2401' },
                        { label: 'Buyer GSTIN', name: 'buyerGstin', type: 'text', placeholder: '27AAPFU0939F1ZV' },
                        { label: 'Invoice Amount (₹)', name: 'amount', type: 'number', placeholder: '100000' },
                        { label: 'Invoice Date', name: 'date', type: 'date', placeholder: '' },
                    ].map(({ label, name, type, placeholder }) => (
                        <div key={name}>
                            <label className="block text-secondary text-xs font-semibold uppercase tracking-wider mb-1.5">
                                {label}
                            </label>
                            <input
                                type={type}
                                name={name}
                                value={form[name]}
                                onChange={handle}
                                required
                                placeholder={placeholder}
                                className="w-full bg-bg border border-card/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-dark rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
                            />
                        </div>
                    ))}

                    {/* GST fields */}
                    <div>
                        <p className="text-secondary text-xs font-semibold uppercase tracking-wider mb-1.5">
                            GST (optional)
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            {['cgst', 'sgst', 'igst'].map((t) => (
                                <div key={t}>
                                    <label className="block text-secondary text-xs mb-1 uppercase">{t}</label>
                                    <input
                                        type="number"
                                        name={`tax.${t}`}
                                        value={form.tax[t]}
                                        onChange={handle}
                                        placeholder="0"
                                        className="w-full bg-bg border border-card/60 focus:border-primary/50 text-dark rounded-xl px-3 py-2 text-sm outline-none transition-all"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                        <Button type="submit" variant="primary" size="md" loading={loading} className="flex-1">
                            Create Invoice
                        </Button>
                        <Button type="button" variant="ghost" size="md" onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>

            <style>{`
                @keyframes animateIn {
                    from { opacity: 0; transform: scale(0.95) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </div>
    );
}
