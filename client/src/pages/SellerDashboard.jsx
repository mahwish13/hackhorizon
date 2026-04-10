import { useState, useEffect } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import TopBar from '../components/dashboard/TopBar';
import StatCard from '../components/dashboard/StatCard';
import InvoiceTable from '../components/dashboard/InvoiceTable';
import InvoiceModal from '../components/dashboard/InvoiceModal';
import CreateInvoiceModal from '../components/dashboard/CreateInvoiceModal';
import api from '../api/axios';
import { BarChart, Bar, ResponsiveContainer, Tooltip } from 'recharts';

export default function SellerDashboard() {
  const [stats, setStats] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [requests, setRequests] = useState([]);
  const [gstData, setGstData] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchData = async () => {
    try {
      const [dashRes, invRes, reqRes, gstRes] = await Promise.all([
        api.get('/dashboard/seller'),
        api.get('/invoices/sent'),
        api.get('/requests/incoming'),
        api.get('/dashboard/gst')
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

  const fmtCurrency = (val) => {
    if (!val && val !== 0) return '--';
    return val.toLocaleString('en-IN');
  };

  if (loading) {
    return (
      <div className="flex bg-bg h-screen overflow-hidden">
        <Sidebar role="seller" />
        <div className="flex-1 flex items-center justify-center">
          <span className="animate-spin border-4 border-primary border-t-transparent rounded-full w-8 h-8" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-bg font-body relative">
      {/* Left Sidebar */}
      <Sidebar role="seller" isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-dark/40 backdrop-blur-sm z-30 md:hidden" 
          onClick={() => setMobileMenuOpen(false)} 
        />
      )}

      {/* Right Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative min-w-0">
        <TopBar title="Seller Overview" onMenuClick={() => setMobileMenuOpen(true)} />

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {/* Section 1: Stat cards row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard 
              label="Total Invoices" 
              value={stats?.totalInvoices || 0} 
              sub="All time" 
              color="border-primary" 
            />
            <StatCard 
              label="Accepted" 
              value={stats?.acceptedCount || 0} 
              sub="Confirmed by buyer" 
              color="border-green-500" 
            />
            <StatCard 
              label="Pending" 
              value={stats?.pendingCount || 0} 
              sub="Awaiting buyer action" 
              color="border-yellow-500" 
            />
            <StatCard 
              label="GST Collected" 
              value={`₹${fmtCurrency(stats?.totals?.grand || 0)}`} 
              sub="On accepted invoices" 
              color="border-blue-500" 
            />
          </div>

          {/* Section 2: Two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Left: Invoice Table */}
            <div className="lg:col-span-2">
              <InvoiceTable 
                invoices={invoices} 
                role="seller" 
                onRowClick={(inv) => setSelectedInvoice(inv)}
                onRefresh={fetchData} 
              />
            </div>

            {/* Right: GST Summary mini-card */}
            <div className="bg-white border border-card rounded-2xl p-6 shadow-sm lg:col-span-1 flex flex-col">
              <h3 className="font-bold text-lg text-dark mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                GST Breakdown
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

                {/* React Recharts implementation used natively in place of external Chart.js to utilize existing module */}
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

          {/* Section 3: Invoice Requests row */}
          <div>
            <h3 className="font-bold text-lg text-dark mb-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Incoming Invoice Requests
            </h3>
            
            {requests.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {requests.map((req) => (
                  <div key={req._id || req.id} className="bg-white border border-card rounded-xl p-5 w-64 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div>
                      <div className="font-mono text-xs font-bold text-dark tracking-wide">{req.buyerGstin}</div>
                      <div className="text-xs text-secondary mt-1.5 italic min-h-[32px]">"{req.note || 'No additional note provided'}"</div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-secondary mt-3">
                        {new Date(req.date || req.createdAt).toLocaleDateString('en-GB')}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleFulfillRequest(req._id || req.id)}
                      className="w-full bg-primary text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-primary/90 transition-colors mt-4"
                    >
                      Fulfill Request
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 bg-white/50 border border-card rounded-2xl border-dashed">
                <span className="text-3xl mb-2 grayscale opacity-60">📭</span>
                <span className="text-sm font-medium text-secondary">No incoming requests</span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* View Modal */}
      {selectedInvoice && (
        <InvoiceModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          role="seller"
        />
      )}

      {/* Create Modal - accessible if you re-bind a trigger button manually later */}
      {showCreateModal && (
        <CreateInvoiceModal
          onClose={() => setShowCreateModal(false)}
          onCreated={() => { setShowCreateModal(false); fetchData(); }}
        />
      )}

    </div>
  );
}
