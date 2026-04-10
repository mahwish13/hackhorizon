import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts';
import Sidebar from '../components/dashboard/Sidebar';
import TopBar from '../components/dashboard/TopBar';
import StatCard from '../components/dashboard/StatCard';
import InvoiceTable from '../components/dashboard/InvoiceTable';
import InvoiceModal from '../components/dashboard/InvoiceModal';
import api from '../api/axios';

export default function BuyerDashboard() {
  const [stats, setStats] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [gstData, setGstData] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reqSellerGstin, setReqSellerGstin] = useState('');
  const [reqNote, setReqNote] = useState('');
  const [reqLoading, setReqLoading] = useState(false);

  const fmtCurrency = (val) => (val || val === 0 ? val.toLocaleString('en-IN') : '--');

  const fetchData = async () => {
    try {
      const [dashRes, invRes, reqRes, gstRes] = await Promise.all([
        api.get('/dashboard/buyer'),
        api.get('/invoices/received'),
        api.get('/requests/mine'),
        api.get('/dashboard/gst'),
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
      await api.post('/requests', { sellerGstin: reqSellerGstin.toUpperCase(), note: reqNote });
      setReqSellerGstin('');
      setReqNote('');
      fetchData();
    } catch (err) {
      console.error('Request failed', err);
    } finally {
      setReqLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden bg-bg">
        <Sidebar isOpen />
        <div className="flex flex-1 items-center justify-center">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen overflow-hidden bg-bg">
      <Sidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      {mobileMenuOpen ? <div className="fixed inset-0 z-30 bg-dark/40 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)} /> : null}

      <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopBar title="Buyer Overview" onMenuClick={() => setMobileMenuOpen(true)} />

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Invoices Received" value={stats?.totalReceived || 0} sub="From all sellers" color="border-primary" />
            <StatCard label="Pending Review" value={stats?.pendingCount || 0} sub="Needs your action" color="border-yellow-500" />
            <StatCard label="GST Payable" value={`Rs${fmtCurrency(stats?.gstPayable?.grandTotalGst || 0)}`} sub="Accepted invoices" color="border-red-400" />
            <StatCard label="Outstanding" value={`Rs${fmtCurrency(stats?.totalAmountPayable || 0)}`} sub="Still unpaid" color="border-orange-400" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <InvoiceTable title="Received Invoices" invoices={invoices} role="buyer" onRowClick={(invoice) => setSelectedInvoice(invoice)} onRefresh={fetchData} />

            <div className="space-y-6">
              <div className="rounded-[1.75rem] border border-card bg-white p-6 shadow-sm">
                <h3 className="font-heading text-xl font-bold text-dark">My GST Payable</h3>
                <div className="mt-5 space-y-4">
                  {[
                    ['CGST', gstData?.totals?.cgst || 0],
                    ['SGST', gstData?.totals?.sgst || 0],
                    ['IGST', gstData?.totals?.igst || 0],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between text-sm">
                      <span className="font-semibold uppercase tracking-[0.18em] text-secondary">{label}</span>
                      <span className="font-bold text-dark">Rs{fmtCurrency(value)}</span>
                    </div>
                  ))}
                </div>

                <div className="my-5 border-t border-card" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-[0.18em] text-dark">Total GST</span>
                  <span className="font-heading text-2xl font-bold text-primary">Rs{fmtCurrency(gstData?.totals?.grand || 0)}</span>
                </div>

                <div className="mt-6 h-48">
                  {gstData?.breakdown?.length ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={gstData.breakdown.map((item) => ({ total: item.total, label: `${item._id.month}/${item._id.year}` }))}>
                        <Tooltip cursor={{ fill: 'rgba(55, 85, 52, 0.05)' }} />
                        <Bar dataKey="total" fill="#375534" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-full items-center justify-center rounded-2xl bg-bg/60 text-sm text-secondary">No GST history available</div>
                  )}
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-card bg-white p-6 shadow-sm">
                <h3 className="font-heading text-xl font-bold text-dark">Request a Missing Invoice</h3>
                <p className="mt-2 text-sm text-secondary">Ask a seller to upload an invoice you are still missing.</p>

                <form onSubmit={handleRequestSubmit} className="mt-5 space-y-4">
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-dark">Seller GSTIN</label>
                    <input
                      type="text"
                      required
                      maxLength="15"
                      value={reqSellerGstin}
                      onChange={(e) => setReqSellerGstin(e.target.value)}
                      placeholder="27AAPFU0939F1ZV"
                      className="w-full rounded-2xl border border-card/60 bg-bg px-4 py-3 text-sm text-dark outline-none transition focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-dark">Note</label>
                    <textarea
                      rows="4"
                      value={reqNote}
                      onChange={(e) => setReqNote(e.target.value)}
                      placeholder="Share any context for the seller"
                      className="w-full resize-none rounded-2xl border border-card/60 bg-bg px-4 py-3 text-sm text-dark outline-none transition focus:border-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={reqLoading}
                    className="w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#436840] disabled:opacity-60"
                  >
                    {reqLoading ? 'Sending request...' : 'Send request'}
                  </button>
                </form>

                <div className="mt-6 space-y-3">
                  {myRequests.slice(0, 3).map((request) => (
                    <div key={request._id || request.id} className="rounded-2xl bg-bg p-4">
                      <p className="font-mono text-xs font-bold text-dark">{request.sellerGstin}</p>
                      <p className="mt-2 text-sm text-secondary">{request.note || 'No note added.'}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedInvoice ? <InvoiceModal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} role="buyer" /> : null}
    </div>
  );
}
