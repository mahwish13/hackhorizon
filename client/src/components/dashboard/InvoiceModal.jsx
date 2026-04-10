import { useState } from 'react';
import StatusBadge from './StatusBadge';
import api from '../../api/axios';

export default function InvoiceModal({ invoice, onClose, role = 'seller', onRefresh }) {
  const [loading, setLoading] = useState(false);
  const [inlineAction, setInlineAction] = useState(null);
  const [actionNote, setActionNote] = useState('');

  if (!invoice) return null;

  const totalTax = (invoice.tax?.cgst || 0) + (invoice.tax?.sgst || 0) + (invoice.tax?.igst || 0);

  const handleAction = async (actionType) => {
    if (actionType === 'accepted') {
      setLoading(true);
      try {
        await api.patch(`/invoices/${invoice.id || invoice._id}/status`, { status: "accepted", note: "" });
        if (onRefresh) onRefresh();
        onClose();
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    } else {
      if (inlineAction === actionType) {
        setInlineAction(null);
      } else {
        setInlineAction(actionType);
        setActionNote('');
      }
    }
  };

  const submitAction = async () => {
    setLoading(true);
    try {
      await api.patch(`/invoices/${invoice.id || invoice._id}/status`, { status: inlineAction, note: actionNote });
      if (onRefresh) onRefresh();
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const markAsPaid = async () => {
    setLoading(true);
    try {
      await api.patch(`/invoices/${invoice.id || invoice._id}/payment`, { paymentStatus: 'paid' });
      if (onRefresh) onRefresh();
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'accepted') return 'bg-green-500';
    if (s === 'rejected') return 'bg-red-500';
    if (s === 'modified') return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  return (
    // Faux viewport wrapper (Not position:fixed as requested)
    <div className="absolute inset-0 min-h-screen w-full bg-dark/50 flex items-center justify-center p-6 z-50 backdrop-blur-sm">
      
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full border border-card shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="font-mono font-bold text-lg text-dark tracking-wide">{invoice.invoiceNumber}</span>
            <span className="text-xs text-secondary mt-1 uppercase tracking-wider font-semibold">
              {new Date(invoice.date || invoice.createdAt).toLocaleDateString('en-GB')}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <StatusBadge status={invoice.status} />
            <button 
              onClick={onClose}
              className="text-2xl text-secondary hover:text-dark transition-colors leading-none pb-1"
            >
              &times;
            </button>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 mt-8">
          <div>
            <div className="text-[10px] uppercase tracking-wider font-bold text-secondary mb-1">Seller GSTIN</div>
            <div className="text-sm font-semibold text-dark">{invoice.sellerGstin}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider font-bold text-secondary mb-1">Buyer GSTIN</div>
            <div className="text-sm font-semibold text-dark">{invoice.buyerGstin}</div>
          </div>
          
          <div className="col-span-2 border-t border-b border-card py-4 my-2 grid grid-cols-2 gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-secondary mb-1">Total Amount</div>
              <div className="text-2xl font-extrabold text-dark" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                ₹{invoice.amount?.toLocaleString('en-IN')}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider font-bold text-secondary mb-1">Total Tax</div>
              <div className="text-lg font-bold text-dark mt-1">₹{totalTax.toLocaleString('en-IN')}</div>
              <div className="text-[10px] text-secondary mt-1 font-medium">
                C: ₹{invoice.tax?.cgst || 0} | S: ₹{invoice.tax?.sgst || 0} | I: ₹{invoice.tax?.igst || 0}
              </div>
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-wider font-bold text-secondary mb-1.5">Payment Status</div>
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border shadow-sm ${
              invoice.paymentStatus === 'paid' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-500 border-red-200'
            }`}>
              {invoice.paymentStatus || 'unpaid'}
            </span>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider font-bold text-secondary mb-1.5">Record Date</div>
            <div className="text-sm font-semibold text-dark">{new Date(invoice.createdAt || invoice.date).toLocaleDateString('en-GB')}</div>
          </div>
        </div>

        {/* Status History */}
        <div className="mt-8">
          <h4 className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">
            Status History
          </h4>
          <div className="flex flex-col gap-4">
            {invoice.history && invoice.history.length > 0 ? (
              invoice.history.map((h, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 shadow-sm ${getStatusColor(h.status)}`} />
                  <div className="flex flex-col flex-1">
                    <span className="text-sm font-bold text-dark capitalize">{h.status}</span>
                    {h.note && <span className="text-xs text-secondary mt-1 italic leading-relaxed">"{h.note}"</span>}
                  </div>
                  <span className="text-[10px] text-secondary font-semibold uppercase tracking-wider">
                    {new Date(h.date).toLocaleDateString('en-GB')}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex items-start gap-4">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${getStatusColor(invoice.status)}`} />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-dark capitalize">{invoice.status}</span>
                  <span className="text-xs text-secondary mt-1">Invoice initially created</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 pt-6 border-t border-bg flex flex-col">
          {role === 'seller' && invoice.paymentStatus !== 'paid' && (
            <button 
              onClick={markAsPaid}
              disabled={loading}
              className="w-full bg-primary text-white rounded-xl px-5 py-3 text-sm font-bold shadow-sm hover:bg-primary/90 transition-colors disabled:opacity-50 tracking-wide uppercase"
            >
              {loading ? 'Processing...' : 'Mark as Paid'}
            </button>
          )}

          {role === 'buyer' && invoice.status?.toLowerCase() === 'pending' && (
            <div className="flex flex-col gap-3">
              {!inlineAction ? (
                <div className="flex gap-2">
                  <button onClick={() => handleAction('accepted')} disabled={loading} className="flex-1 bg-green-100 text-green-700 border border-green-200 hover:bg-green-200 transition text-xs px-2 py-2.5 rounded-xl font-bold uppercase tracking-wider shadow-sm disabled:opacity-50">
                    Accept
                  </button>
                  <button onClick={() => handleAction('rejected')} disabled={loading} className="flex-1 bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 transition text-xs px-2 py-2.5 rounded-xl font-bold uppercase tracking-wider shadow-sm disabled:opacity-50">
                    Reject
                  </button>
                  <button onClick={() => handleAction('modified')} disabled={loading} className="flex-1 bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 transition text-xs px-2 py-2.5 rounded-xl font-bold uppercase tracking-wider shadow-sm disabled:opacity-50">
                    Modify
                  </button>
                </div>
              ) : (
                <div className="animate-fadeIn shadow-inner bg-bg/50 border border-card rounded-xl p-4 flex flex-col gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-dark">
                    {inlineAction === 'rejected' ? 'Rejection Reason' : 'Modification Details'}
                  </span>
                  <textarea 
                    value={actionNote} 
                    onChange={(e) => setActionNote(e.target.value)} 
                    placeholder={inlineAction === 'rejected' ? 'Why are you rejecting this invoice?' : 'What needs to be changed?'}
                    className="text-sm border border-card rounded-lg px-3 py-2 flex-1 w-full bg-white resize-none outline-none focus:border-primary focus:ring-1 focus:ring-primary/20"
                    rows={2}
                    autoFocus
                  />
                  <div className="flex gap-2 justify-end">
                    <button onClick={() => setInlineAction(null)} className="text-xs font-bold text-secondary hover:text-dark px-3 mt-1">
                      Cancel
                    </button>
                    <button onClick={submitAction} disabled={loading} className={`text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm ${inlineAction === 'rejected' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}>
                      {loading ? 'Working...' : 'Confirm'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
