import React, { useState, useEffect } from 'react';
import API from '../api';
import { PlusCircle, Search } from 'lucide-react';

const StaffDashboard = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [claims, setClaims] = useState([]);
  const [view, setView] = useState('list'); // 'list' | 'log' | 'claims'
  const [formData, setFormData] = useState({ itemName: '', description: '', locationFound: '', dateFound: '' });

  useEffect(() => {
    if (view === 'list') {
      API.get('/items/found-items').then(res => setFoundItems(res.data)).catch(console.error);
    } else if (view === 'claims') {
      API.get('/claims').then(res => setClaims(res.data)).catch(console.error);
    }
  }, [view]);

  const handleLogSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/items/found', formData);
      setView('list');
      setFormData({ itemName: '', description: '', locationFound: '', dateFound: '' });
    } catch (err) {
      alert('Failed to log found item');
    }
  };

  const handleVerifyClaim = async (id, status) => {
    try {
      await API.put(`/claims/${id}/verify`, { status });
      setView('list');
      setTimeout(() => setView('claims'), 0);
    } catch (err) {
      alert('Failed to verify claim');
    }
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Staff Dashboard</h1>
        <div className="flex space-x-3">
          <button onClick={() => setView('list')} className={`px-4 py-2 rounded-xl font-medium transition-colors border ${view === 'list' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>Found Items</button>
          <button onClick={() => setView('claims')} className={`px-4 py-2 rounded-xl font-medium transition-colors border ${view === 'claims' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}>Manage Claims</button>
          <button onClick={() => setView('log')} className="bg-emerald-600 hover:bg-emerald-700 shadow-md text-white px-5 py-2 rounded-xl font-medium flex items-center space-x-2 transition-all">
            <PlusCircle size={18} /><span>Log Found Item</span>
          </button>
        </div>
      </div>

      {view === 'log' && (
        <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Log a Found Item</h2>
          <form onSubmit={handleLogSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Item Name</label>
              <input type="text" required className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none px-4 py-2.5 transition-all" value={formData.itemName} onChange={e => setFormData({...formData, itemName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea required className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none px-4 py-3 h-24 transition-all" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Location Found</label>
                <input type="text" required className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none px-4 py-2.5 transition-all" value={formData.locationFound} onChange={e => setFormData({...formData, locationFound: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Date Found</label>
                <input type="date" required className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 rounded-xl outline-none px-4 py-2.5 transition-all" value={formData.dateFound} onChange={e => setFormData({...formData, dateFound: e.target.value})} />
              </div>
            </div>
            <div className="flex space-x-4 pt-6 border-t mt-4">
              <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold shadow-md transition-all">Submit Log</button>
              <button type="button" onClick={() => setView('list')} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {view === 'list' && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {foundItems.map(item => (
             <div key={item._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
               <div className={`absolute left-0 top-0 w-1.5 h-full ${
                 item.status === 'Found' ? 'bg-amber-400' :
                 item.status === 'Matched' ? 'bg-blue-400' : 'bg-emerald-400'
               }`}></div>
               <div className="flex justify-between items-start mb-3 pl-3">
                 <h3 className="text-xl font-bold text-gray-800">{item.itemName}</h3>
                 <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    item.status === 'Found' ? 'bg-amber-50 text-amber-700' :
                    item.status === 'Matched' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                 }`}>{item.status}</span>
               </div>
               <p className="text-sm text-gray-600 mb-5 pl-3 line-clamp-2">{item.description}</p>
               <div className="text-xs text-gray-400 pl-3">
                 Found at <b>{item.locationFound}</b> on <b>{new Date(item.dateFound).toLocaleDateString()}</b>
               </div>
             </div>
          ))}
          {foundItems.length === 0 && (
            <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">No found items logged yet.</p>
            </div>
          )}
        </div>
      )}

      {view === 'claims' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm border-b uppercase tracking-wider">
                <th className="p-5 font-semibold">Item Report</th>
                <th className="p-5 font-semibold">Found Item</th>
                <th className="p-5 font-semibold">Passenger</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {claims.map(claim => (
                <tr key={claim._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-5 font-medium text-gray-800">{claim.itemReport?.itemName || 'N/A'}</td>
                  <td className="p-5 text-gray-600">{claim.foundItem?.itemName || 'N/A'}</td>
                  <td className="p-5 text-gray-600">
                    <div>{claim.passenger?.name || 'N/A'}</div>
                    <div className="text-xs text-gray-400">{claim.passenger?.email || ''}</div>
                  </td>
                  <td className="p-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      claim.status === 'Pending Verification' ? 'bg-amber-50 text-amber-700' :
                      claim.status === 'Verified' ? 'bg-blue-50 text-blue-700' :
                      claim.status === 'Rejected' ? 'bg-red-50 text-red-700' :
                      'bg-emerald-50 text-emerald-700'
                    }`}>
                      {claim.status}
                    </span>
                  </td>
                  <td className="p-5 flex space-x-2">
                    {claim.status === 'Pending Verification' && (
                      <>
                        <button onClick={() => handleVerifyClaim(claim._id, 'Verified')} className="text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors font-medium">Verify</button>
                        <button onClick={() => handleVerifyClaim(claim._id, 'Rejected')} className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 transition-colors font-medium">Reject</button>
                      </>
                    )}
                    {claim.status === 'Verified' && (
                      <button onClick={() => handleVerifyClaim(claim._id, 'Released')} className="bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-1.5 rounded-lg transition-colors font-medium shadow-sm">Release Item</button>
                    )}
                  </td>
                </tr>
              ))}
              {claims.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-gray-500 font-medium bg-gray-50/50">No claims awaiting management.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
