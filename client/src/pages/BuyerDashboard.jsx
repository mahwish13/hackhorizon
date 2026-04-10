import { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import TopBar from '../components/dashboard/TopBar';
import StatCard from '../components/dashboard/StatCard';
import InvoiceTable from '../components/dashboard/InvoiceTable';
import InvoiceModal from '../components/dashboard/InvoiceModal';
import StatusBadge from '../components/dashboard/StatusBadge';
import api from '../api/axios';
import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';

export default function BuyerDashboard() {
  const [stats, setStats] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [gstData, setGstData] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Request form state
  const [reqSellerGstin, setReqSellerGstin] = useState('');
  const [reqNote, setReqNote] = useState('');
  const [reqLoading, setReqLoading] = useState(false);

  const fetchData = async () => {
    try {
      const [dashRes, invRes, reqRes, gstRes] = await Promise.all([
        api.get('/dashboard/buyer'),
        api.get('/invoices/received'),
        api.get('/requests/mine'),
        api.get('/dashboard/gst')
      ]);
      setStats(dashRes.data?.data || null);
      setInvoices(invRes.data?.data || []);
      setMyRequests(reqRes.data?.data || []);
      setGstData(gstRes.data?.data || null);
    } catch (err) {
      console.error('Data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setReqLoading(true);
    try {
      await api.post('/requests', { 
        sellerGstin: reqSellerGstin.toUpperCase(), 
        note: reqNote 
      });
      alert('Request sent successfully');
      setReqSellerGstin('');
      setReqNote('');
      fetchData(); // Refresh list
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send request');
    } finally {
      setReqLoading(false);
    }
  };

  const fmtCurrency = (val) => {
    if (!val && val !== 0) return '--';
    return val.toLocaleString('en-IN');
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '--';
    return new Date(dateStr).toLocaleDateString('en-GB');
  };

  if (loading) {
    return (
      <div className="flex bg-bg h-screen overflow-hidden">
        <Sidebar role="buyer" />
        <div className="flex-1 flex items-center justify-center">
          <span className="animate-spin border-4 border-primary border-t-transparent rounded-full w-8 h-8" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-bg font-body relative">
      {/* Left Sidebar */}
      <Sidebar role="buyer" isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-dark/40 backdrop-blur-sm z-30 md:hidden" 
          onClick={() => setMobileMenuOpen(false)} 
        />
      )}

      {/* Right Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative min-w-0">
        <TopBar title="Buyer Overview" onMenuClick={() => setMobileMenuOpen(true)} />

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {/* Section 1: Stat cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard 
              label="Invoices Received" 
              value={stats?.totalReceived || 0} 
              sub="From all sellers" 
              color="border-primary" 
            />
            <StatCard 
              label="Pending Review" 
              value={stats?.pendingCount || 0} 
              sub="Needs your action" 
              color="border-yellow-500" 
            />
            <StatCard 
              label="GST Payable" 
              value={`₹${fmtCurrency(stats?.totals?.grand || 0)}`} 
              sub="On accepted invoices" 
              color="border-red-400" 
            />
            <StatCard 
              label="Outstanding" 
              value={`₹${fmtCurrency(stats?.totalOutstanding || 0)}`} 
              sub="Unpaid invoices" 
              color="border-orange-400" 
            />
          </div>

          {/* Section 2: Two columns */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
            
            {/* Left: Invoice Table */}
            <div className="xl:col-span-2">
              <InvoiceTable 
                title="Received Invoices"
                invoices={invoices} 
                role="buyer" 
                onRowClick={(inv) => setSelectedInvoice(inv)}
                onRefresh={fetchData} 
              />
            </div>

            {/* Right: GST Summary mini-card */}
            <div className="bg-white border border-card rounded-2xl p-6 shadow-sm xl:col-span-1 flex flex-col h-full">
              <h3 className="font-bold text-lg text-dark mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                My GST Payable
              </h3>
              
              <div className="flex flex-col gap-4 flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-secondary">CGST</span>
                  <span className="font-bold text-sm text-dark">₹{fmtCurrency(gstData?.cgst || 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-secondary">SGST</span>
                  <span className="font-bold text-sm text-dark">₹{fmtCurrency(gstData?.sgst || 0)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold uppercase tracking-wider text-secondary">IGST</span>
                  <span className="font-bold text-sm text-dark">₹{fmtCurrency(gstData?.igst || 0)}</span>
                </div>
                
                <hr className="border-card my-1" />
                
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-dark">Total GST</span>
                  <span className="font-bold text-lg text-primary">
                    ₹{fmtCurrency((gstData?.cgst || 0) + (gstData?.sgst || 0) + (gstData?.igst || 0))}
                  </span>
                </div>

                <div className="h-[160px] w-full mt-auto">
                  {gstData?.history && gstData.history.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={gstData.history}>
                        <Tooltip cursor={{ fill: 'rgba(55, 85, 52, 0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="total" fill="#375534" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-xs font-medium text-secondary/60 bg-bg/50 rounded-lg">
                      No GST history available
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Section 3: Invoice Requests */}
          <div className="flex gap-6 flex-wrap lg:flex-nowrap items-start">
            
            {/* Request Missing Invoice Card */}
            <div className="bg-white border border-card rounded-2xl p-6 shadow-sm w-full lg:max-w-md">
              <h3 className="font-bold text-lg text-dark leading-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Request a Missing Invoice
              </h3>
              <p className="text-xs text-secondary mt-1 tracking-wide mb-6">
                Ask a seller to upload an invoice you're missing
              </p>

              <form onSubmit={handleRequestSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-dark uppercase tracking-wider mb-1.5">Seller GSTIN</label>
                  <input
                    type="text"
                    required
                    maxLength="15"
                    value={reqSellerGstin}
                    onChange={(e) => setReqSellerGstin(e.target.value)}
                    placeholder="27AAPFU0939F1ZV"
                    className="w-full bg-bg border border-card/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-medium text-dark uppercase placeholder-secondary/60 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-dark uppercase tracking-wider mb-1.5">Note (optional)</label>
                  <textarea
                    rows={3}
                    value={reqNote}
                    onChange={(e) => setReqNote(e.target.value)}
                    placeholder="e.g. Invoice for March order of 500 units"
                    className="w-full bg-bg border border-card/60 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-medium text-dark placeholder-secondary/60 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={reqLoading}
                  className="w-full bg-dark text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-primary transition-colors disabled:opacity-50 mt-1"
                >
                  {reqLoading ? 'Sending...' : 'Send Request'}
                </button>
              </form>
            </div>

            {/* List of Your Requests */}
            <div className="w-full lg:flex-1 bg-white border border-card/60 shadow-sm p-6 rounded-2xl min-h-[340px]">
              <h4 className="text-xs font-bold text-secondary uppercase tracking-widest mb-4">
                Your Requests
              </h4>
              
              <div className="flex flex-col">
                {myRequests.length > 0 ? (
                  myRequests.map((req) => (
                    <div key={req._id || req.id} className="flex items-start gap-4 border-b border-bg py-4 last:border-none group">
                      <div className="flex flex-col">
                        <span className="font-mono text-[13px] font-extrabold tracking-wide text-dark">{req.sellerGstin}</span>
                        <span className="text-xs text-secondary mt-1.5 italic">"{req.note || 'No additional note provided'}"</span>
                      </div>
                      <div className="flex flex-col items-end gap-2 ml-auto">
                        <StatusBadge status={req.status} />
                        <span className="text-[10px] uppercase font-semibold tracking-wider text-secondary/80">
                          {formatDate(req.date || req.createdAt)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-10">
                    <span className="text-2xl mb-2 opacity-50 grayscale">📭</span>
                    <span className="text-xs font-medium text-secondary/80">No requests sent yet</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* View Modal */}
      {selectedInvoice && (
        <InvoiceModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          role="buyer"
        />
      )}

    </div>
  );
}
