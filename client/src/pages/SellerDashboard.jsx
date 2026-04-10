import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip } from 'recharts';
import Sidebar from '../components/dashboard/Sidebar';
import TopBar from '../components/dashboard/TopBar';
import StatCard from '../components/dashboard/StatCard';
import InvoiceTable from '../components/dashboard/InvoiceTable';
import InvoiceModal from '../components/dashboard/InvoiceModal';
import api from '../api/axios';

export default function SellerDashboard() {
  const [stats, setStats] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [requests, setRequests] = useState([]);
  const [gstData, setGstData] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fmtCurrency = (val) => (val || val === 0 ? val.toLocaleString('en-IN') : '--');

  const fetchData = async () => {
    try {
      const [dashRes, invRes, reqRes, gstRes] = await Promise.all([
        api.get('/dashboard/seller'),
        api.get('/invoices/sent'),
        api.get('/requests/incoming'),
        api.get('/dashboard/gst'),
      ]);

      setStats(dashRes.data?.data || null);
      setInvoices(invRes.data?.data || []);
      setRequests(reqRes.data?.data || []);
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

  const handleFulfillRequest = async (id) => {
    try {
      await api.patch(`/requests/${id}/fulfill`);
      fetchData();
    } catch (err) {
      console.error('Failed to fulfill request:', err);
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
        <TopBar title="Seller Overview" onMenuClick={() => setMobileMenuOpen(true)} />

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Total Invoices" value={stats?.totalSent || 0} sub="All sent invoices" color="border-primary" />
            <StatCard label="Accepted" value={stats?.acceptedCount || 0} sub="Confirmed by buyers" color="border-green-500" />
            <StatCard label="Pending" value={stats?.pendingCount || 0} sub="Awaiting buyer action" color="border-yellow-500" />
            <StatCard label="GST Collected" value={`Rs${fmtCurrency(stats?.gstCollected?.grandTotalGst || 0)}`} sub="Accepted invoices" color="border-blue-500" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <InvoiceTable invoices={invoices} role="seller" onRowClick={(invoice) => setSelectedInvoice(invoice)} onRefresh={fetchData} />

            <div className="rounded-[1.75rem] border border-card bg-white p-6 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-dark">GST Breakdown</h3>

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
          </div>

          <div className="mt-8">
            <h3 className="mb-4 font-heading text-xl font-bold text-dark">Incoming Invoice Requests</h3>
            {requests.length ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {requests.map((request) => (
                  <div key={request._id || request.id} className="rounded-[1.5rem] border border-card bg-white p-5 shadow-sm">
                    <p className="font-mono text-xs font-bold tracking-[0.18em] text-dark">{request.buyerGstin}</p>
                    <p className="mt-3 min-h-[48px] text-sm text-secondary">{request.note || 'No additional note provided.'}</p>
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-secondary">
                      {new Date(request.createdAt).toLocaleDateString('en-GB')}
                    </p>
                    <button
                      onClick={() => handleFulfillRequest(request._id || request.id)}
                      className="mt-4 w-full rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#436840]"
                    >
                      Fulfill Request
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-[1.75rem] border border-dashed border-card bg-white/50 p-10 text-center text-secondary">
                No incoming requests.
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedInvoice ? <InvoiceModal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} role="seller" /> : null}
    </div>
  );
}
