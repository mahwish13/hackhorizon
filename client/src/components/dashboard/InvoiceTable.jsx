import { useState } from 'react';
import StatusBadge from './StatusBadge';
import api from '../../api/axios';

export default function InvoiceTable({ title = "Invoices", invoices = [], role = "seller", onRowClick, onRefresh }) {
  const [filter, setFilter] = useState('All');
  const [inlineAction, setInlineAction] = useState(null);
  const [actionNote, setActionNote] = useState('');
  
  const filteredInvoices = invoices.filter(inv => {
    if (filter === 'All') return true;
    return inv.status?.toLowerCase() === filter.toLowerCase();
  });

  const handlePaymentToggle = async (inv, e) => {
    e.stopPropagation();
    if (role !== 'seller') return; 
    
    try {
      const newStatus = inv.paymentStatus === 'paid' ? 'unpaid' : 'paid';
      await api.patch(`/invoices/${inv.id || inv._id}/payment`, { paymentStatus: newStatus });
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Failed to toggle payment status', err);
    }
  };

  const handleBuyerActionClick = async (inv, actionType, e) => {
    e.stopPropagation();
    
    if (actionType === 'accepted') {
      try {
        await api.patch(`/invoices/${inv.id || inv._id}/status`, { status: "accepted", note: "" });
        // Toast logic could go here
        alert("Invoice accepted successfully");
        if (onRefresh) onRefresh();
      } catch (err) {
        console.error('Failed to accept invoice', err);
      }
    } else {
      const invId = inv.id || inv._id;
      if (inlineAction?.id === invId && inlineAction?.type === actionType) {
        setInlineAction(null);
      } else {
        setInlineAction({ id: invId, type: actionType });
        setActionNote('');
      }
    }
  };

  const submitInlineAction = async (inv, e) => {
    e.stopPropagation();
    try {
      await api.patch(`/invoices/${inv.id || inv._id}/status`, { status: inlineAction.type, note: actionNote });
      setInlineAction(null);
      setActionNote('');
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Failed to submit updated status action', err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '--';
    const d = new Date(dateStr);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear().toString().slice(2)}`;
  };

  const columns = role === 'seller'
    ? ['Invoice No.', 'Buyer GSTIN', 'Amount', 'Tax', 'Date', 'Status', 'Payment', 'Action']
    : ['Invoice No.', 'Seller GSTIN', 'Amount', 'Tax', 'Date', 'Status', 'Action'];

  return (
    <div className="bg-white border border-card rounded-2xl p-6 shadow-sm flex flex-col h-full w-full overflow-hidden">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h3 className="font-semibold text-lg text-dark" style={{ fontFamily: 'Plus Jakarta Sans' }}>
          {title}
        </h3>
        
        <div className="flex gap-2 flex-wrap">
          {['All', 'Pending', 'Accepted', 'Rejected'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors ${
                filter === f ? 'bg-dark text-white shadow-md' : 'bg-card/40 text-dark hover:bg-card/70'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table Area */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-bg/50 border-y border-card/60 text-xs font-semibold text-secondary uppercase tracking-wider">
            <tr>
              {columns.map((col, idx) => (
                <th key={col} className={`px-4 py-3 ${idx === 0 ? 'rounded-tl-lg' : ''} ${idx === columns.length - 1 ? 'rounded-tr-lg' : ''}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-card/40">
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv) => {
                const totalTax = (inv.tax?.cgst || 0) + (inv.tax?.sgst || 0) + (inv.tax?.igst || 0);
                const isPaid = inv.paymentStatus === 'paid';
                const invId = inv.id || inv._id;

                return (
                  <React.Fragment key={invId}>
                    <tr 
                      className="hover:bg-bg/40 transition-colors group cursor-pointer"
                      onClick={() => onRowClick && onRowClick(inv)}
                    >
                      <td className="px-4 py-3.5 font-mono text-xs font-bold text-dark">{inv.invoiceNumber}</td>
                      <td className="px-4 py-3.5 text-xs text-secondary font-medium tracking-wide">
                        {role === 'seller' ? inv.buyerGstin : inv.sellerGstin}
                      </td>
                      <td className="px-4 py-3.5 font-bold text-dark">₹{inv.amount?.toLocaleString()}</td>
                      <td className="px-4 py-3.5 text-xs text-secondary font-medium">₹{totalTax?.toLocaleString()}</td>
                      <td className="px-4 py-3.5 text-xs text-secondary font-medium">{formatDate(inv.date)}</td>
                      
                      {role === 'seller' ? (
                        <>
                          <td className="px-4 py-3.5">
                            <StatusBadge status={inv.status} />
                          </td>
                          <td className="px-4 py-3.5">
                            <button
                              onClick={(e) => handlePaymentToggle(inv, e)}
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border transition-colors shadow-sm ${
                                isPaid ? 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100' : 'bg-red-50 text-red-500 border-red-200 hover:bg-red-100'
                              }`}
                            >
                              {isPaid ? 'Paid' : 'Unpaid'}
                            </button>
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="text-xs font-bold text-primary hover:text-dark transition-colors border-b border-transparent hover:border-dark pb-0.5 pointer-events-none">
                              View <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-0.5">&rarr;</span>
                            </span>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-3.5">
                            <StatusBadge status={inv.status} />
                          </td>
                          <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                            {inv.status?.toLowerCase() === 'pending' ? (
                              <div className="flex gap-2 relative">
                                <button
                                  onClick={(e) => handleBuyerActionClick(inv, 'accepted', e)}
                                  className="bg-green-100 text-green-700 border border-green-200 hover:bg-green-200 transition text-xs px-2 py-1 rounded-lg font-semibold shadow-sm"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={(e) => handleBuyerActionClick(inv, 'rejected', e)}
                                  className="bg-red-100 text-red-700 border border-red-200 hover:bg-red-200 transition text-xs px-2 py-1 rounded-lg font-semibold shadow-sm"
                                >
                                  Reject
                                </button>
                                <button
                                  onClick={(e) => handleBuyerActionClick(inv, 'modified', e)}
                                  className="bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 transition text-xs px-2 py-1 rounded-lg font-semibold shadow-sm"
                                >
                                  Modify
                                </button>
                              </div>
                            ) : (
                              <span 
                                onClick={() => onRowClick && onRowClick(inv)} 
                                className="text-xs font-bold text-primary hover:text-dark transition-colors border-b border-transparent hover:border-dark pb-0.5 cursor-pointer"
                              >
                                Details <span>&rarr;</span>
                              </span>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                    
                    {/* Inline Action Row for Buyer */}
                    {inlineAction?.id === invId && (
                      <tr className="bg-bg/40 animate-fadeIn">
                        <td colSpan={columns.length} className="px-4 py-3 border-y border-card/30">
                          <div className="flex items-center gap-3">
                            <svg className="w-4 h-4 text-secondary ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                            <input 
                              type="text" 
                              value={actionNote} 
                              onChange={(e) => setActionNote(e.target.value)} 
                              placeholder={inlineAction.type === 'rejected' ? 'Reason for rejection...' : 'What needs to be changed?'}
                              className="text-xs border border-card/60 bg-white rounded-lg px-4 py-2.5 flex-1 min-w-0 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-dark font-medium placeholder-secondary/60"
                              autoFocus
                            />
                            <button 
                              onClick={(e) => submitInlineAction(inv, e)} 
                              className={`text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm ${
                                inlineAction.type === 'rejected' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                              }`}
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setInlineAction(null)}
                              className="text-xs font-semibold text-secondary hover:text-dark px-3 py-2.5"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-8 text-center text-secondary text-sm font-medium">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
