import React, { useState, useEffect } from 'react';
import API from '../api';
import { PlusCircle, Search } from 'lucide-react';

const PassengerDashboard = () => {
  const [reports, setReports] = useState([]);
  const [view, setView] = useState('list'); // 'list' | 'report'
  const [formData, setFormData] = useState({ itemName: '', description: '', placeLost: '', dateLost: '' });

  useEffect(() => {
    if (view === 'list') {
      API.get('/items/my-reports').then((res) => setReports(res.data)).catch(console.error);
    }
  }, [view]);

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/items/report', formData);
      setView('list');
      setFormData({ itemName: '', description: '', placeLost: '', dateLost: '' });
    } catch (err) {
      alert('Failed to submit report');
    }
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Passenger Dashboard</h1>
        {view === 'list' && (
          <button 
            onClick={() => setView('report')}
            className="bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg text-white px-5 py-2.5 rounded-xl font-medium flex items-center space-x-2 transition-all"
          >
            <PlusCircle size={20} /><span>Report Lost Item</span>
          </button>
        )}
      </div>

      {view === 'list' ? (
        reports.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center max-w-2xl mx-auto mt-12">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">No active reports found</h3>
            <p className="text-gray-500 mb-8">Looks like you haven't reported any lost items yet. Report an item to begin the matching process.</p>
            <button 
              onClick={() => setView('report')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Report an Item
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reports.map(report => (
              <div key={report._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className={`absolute top-0 left-0 w-1.5 h-full ${
                  report.status === 'Lost' ? 'bg-red-400' : 
                  report.status === 'Matched' ? 'bg-blue-400' : 'bg-emerald-400'
                }`}></div>
                <div className="flex justify-between items-start mb-4 pl-3">
                  <h3 className="text-xl font-bold text-gray-800">{report.itemName}</h3>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    report.status === 'Lost' ? 'bg-red-50 text-red-700' : 
                    report.status === 'Matched' ? 'bg-blue-50 text-blue-700' : 'bg-emerald-50 text-emerald-700'
                  }`}>
                    {report.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-5 pl-3 line-clamp-2">{report.description}</p>
                <div className="flex justify-between text-xs text-gray-400 border-t pt-4 pl-3">
                  <span>{new Date(report.dateLost).toLocaleDateString()}</span>
                  <span>{report.placeLost}</span>
                </div>
                {report.status === 'Matched' && (
                  <button className="w-full mt-5 bg-gradient-to-r from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 text-emerald-700 font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center space-x-2 border border-emerald-200">
                    <Search size={18} /> <span>Claim Matched Item</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-gray-800">Submit a Lost Item Report</h2>
          <form onSubmit={handleReportSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Item Name</label>
              <input type="text" required placeholder="E.g., iPhone 13 Pro" className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none rounded-xl px-4 py-2.5 transition-all" value={formData.itemName} onChange={e => setFormData({...formData, itemName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea required placeholder="Detailed description to help us identify the item..." className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none rounded-xl px-4 py-3 h-32 transition-all" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Place Lost</label>
                <input type="text" required placeholder="E.g., Terminal 2" className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none rounded-xl px-4 py-2.5 transition-all" value={formData.placeLost} onChange={e => setFormData({...formData, placeLost: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Date Lost</label>
                <input type="date" required className="w-full bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none rounded-xl px-4 py-2.5 transition-all" value={formData.dateLost} onChange={e => setFormData({...formData, dateLost: e.target.value})} />
              </div>
            </div>
            <div className="flex space-x-4 pt-6 border-t mt-6">
              <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition-all shadow-md">Submit Report</button>
              <button type="button" onClick={() => setView('list')} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-medium transition-all">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PassengerDashboard;
