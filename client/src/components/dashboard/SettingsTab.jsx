import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../api/axios';

export default function SettingsTab() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', gstin: '', type: 'seller' });

  const handleAddBusiness = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/business', formData);
      setUser(res.data.user);
      setFormData({ name: '', gstin: '', type: 'seller' });
      alert('Business successfully linked!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to add business');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#111a15] border border-[#243124] rounded-2xl p-6 lg:max-w-3xl">
      <h3 className="font-bold text-lg text-white mb-6" style={{ fontFamily: 'Plus Jakarta Sans' }}>Business Profiles</h3>
      
      <div className="mb-8">
        <h4 className="text-[11px] font-bold text-[#6b8f76] uppercase tracking-[0.12em] mb-4">Linked Businesses</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Legacy Primary Business */}
            {user?.gstin && (
              <div className="bg-[#0f1812] border border-[#4ade80]/30 rounded-xl p-4 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 px-2 py-1 bg-[#4ade80]/10 text-[#4ade80] text-[10px] font-bold rounded-bl-lg">PRIMARY</div>
                <span className="font-bold text-white mb-1">Default Profile</span>
                <span className="text-xs font-mono text-[#6b8f76] uppercase tracking-wider">{user.gstin}</span>
              </div>
            )}
            
            {/* Added Businesses */}
            {user?.businesses?.map((b, idx) => (
              <div key={idx} className="bg-[#0f1812] border border-[#243124] rounded-xl p-4 flex flex-col">
                <span className="font-bold text-white mb-1">{b.name}</span>
                <span className="text-xs font-mono text-[#6b8f76] uppercase tracking-wider">{b.gstin}</span>
                <span className="text-[10px] font-bold text-[#3d5945] uppercase mt-2">{b.type}</span>
              </div>
            ))}
        </div>
      </div>

      <div className="pt-6 border-t border-[#1a2a1f]">
        <h4 className="text-[11px] font-bold text-[#6b8f76] uppercase tracking-[0.12em] mb-4">Add New Business</h4>
        
        <form onSubmit={handleAddBusiness} className="flex flex-col gap-4 max-w-sm">
          <div>
            <label className="block text-xs font-semibold text-[#3d5945] mb-1.5 cursor-pointer">Business Name</label>
            <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Acme Corp" className="w-full bg-[#0a0f0d] border border-[#243124] rounded-lg px-4 py-2.5 text-sm outline-none text-white focus:border-[#4ade80]/50 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#3d5945] mb-1.5 cursor-pointer">Entity GSTIN</label>
            <input required type="text" maxLength={15} value={formData.gstin} onChange={(e) => setFormData({...formData, gstin: e.target.value.toUpperCase()})} placeholder="27AAPFU0939F1ZV" className="w-full bg-[#0a0f0d] border border-[#243124] rounded-lg px-4 py-2.5 text-sm font-mono uppercase outline-none text-white focus:border-[#4ade80]/50 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#3d5945] mb-1.5 cursor-pointer">Operation Type</label>
            <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full bg-[#0a0f0d] border border-[#243124] rounded-lg px-4 py-2.5 text-sm outline-none text-white focus:border-[#4ade80]/50 transition-colors active:outline-none focus:ring-0">
                <option value="seller">Seller / Vendor</option>
                <option value="buyer">Buyer / Client</option>
                <option value="both">Both</option>
            </select>
          </div>
          
          <button type="submit" disabled={loading} className="mt-2 bg-[#4ade80] hover:bg-[#86efac] text-[#0a0f0d] font-bold py-2.5 rounded-lg text-sm transition-colors shadow-lg shadow-[#4ade80]/20 disabled:opacity-50">
            {loading ? 'Registering...' : 'Link Business Data'}
          </button>
        </form>
      </div>

    </div>
  );
}
