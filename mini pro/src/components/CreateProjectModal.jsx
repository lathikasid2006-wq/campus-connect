import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Sparkles, Code, Cpu } from 'lucide-react';

export const CreateProjectModal = ({ isOpen, onClose }) => {
  const { addProject } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requiredSkills: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    const skillsArr = formData.requiredSkills
      ? formData.requiredSkills.split(',').map((s) => s.trim())
      : ['React.js', 'Python'];

    addProject({
      title: formData.title,
      description: formData.description,
      requiredSkills: skillsArr
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-gray-700 shadow-2xl relative">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Post Project Idea for AI Matching</h3>
            <p className="text-xs text-gray-400">Specify project goals & required technical skills</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Project Title *</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. AI Powered Campus Navigation & IoT Portal"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Project Description *</label>
            <textarea 
              required
              rows={3}
              placeholder="Describe project problem statement, objectives and scope..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Required Skills (Comma Separated) *</label>
            <input 
              type="text" 
              required
              placeholder="e.g. React.js, Python, Scikit-Learn, MongoDB"
              value={formData.requiredSkills}
              onChange={(e) => setFormData({...formData, requiredSkills: e.target.value})}
              className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
            />
            <p className="text-[11px] text-purple-300/70 mt-1">✨ Our AI Scikit-Learn engine will use TF-IDF & Cosine Similarity to find matching teammates based on these skills!</p>
          </div>

          <div className="pt-2 flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl border border-gray-700 text-sm font-medium text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-sm font-bold text-white shadow-lg shadow-purple-500/20"
            >
              Launch Project
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
