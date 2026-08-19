import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Send, UserCheck, Sparkles } from 'lucide-react';

export const ConnectModal = ({ isOpen, onClose, student }) => {
  const { showToast } = useAuth();
  const [message, setMessage] = useState('');

  if (!isOpen || !student) return null;

  const handleSend = (e) => {
    e.preventDefault();
    showToast(`Team invitation sent to ${student.name}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-gray-700 shadow-2xl relative">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${student.avatarColor || 'from-emerald-500 to-indigo-600'} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
            {student.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-base font-bold text-white">{student.name}</h3>
            <p className="text-xs text-gray-400">{student.department} • {student.year}</p>
            <span className="inline-block mt-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
              ✨ {student.matchScore}% Match Score
            </span>
          </div>
        </div>

        <div className="bg-gray-900/60 rounded-xl p-3 border border-gray-800 mb-4">
          <p className="text-xs text-gray-400 font-medium mb-1">Skills Highlight:</p>
          <div className="flex flex-wrap gap-1">
            {student.skills.map((skill, idx) => (
              <span key={idx} className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <form onSubmit={handleSend} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Invite Message</label>
            <textarea 
              rows={3}
              placeholder={`Hi ${student.name.split(' ')[0]}, I saw your profile on Campus Connect AI Matcher. We are building a project and would love to collaborate with you!`}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <div className="flex space-x-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2 rounded-xl border border-gray-700 text-xs font-medium text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-xs font-bold text-white flex items-center justify-center space-x-1.5 shadow-lg shadow-emerald-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Invite</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
