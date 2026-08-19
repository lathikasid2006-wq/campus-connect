import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Upload, FileText, Tag } from 'lucide-react';

export const UploadResourceModal = ({ isOpen, onClose }) => {
  const { addResource } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    subject: 'Data Structures',
    department: 'Information Technology',
    semester: '3rd Semester',
    description: '',
    tags: '',
    fileType: 'PDF',
    fileSize: '4.2 MB'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    const tagArray = formData.tags 
      ? formData.tags.split(',').map(t => t.trim()) 
      : [formData.subject, formData.department];

    addResource({
      ...formData,
      tags: tagArray
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
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <Upload className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Upload Study Material</h3>
            <p className="text-xs text-gray-400">Share course notes, question papers or lab manuals</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Resource Title *</label>
            <input 
              type="text" 
              required 
              placeholder="e.g. Data Structures Tree & Graph Traversal Notes"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Subject</label>
              <select 
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Data Structures">Data Structures</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Web Development">Web Development</option>
                <option value="DBMS">DBMS</option>
                <option value="Operating Systems">Operating Systems</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Department</label>
              <select 
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Information Technology">Information Technology</option>
                <option value="Computer Science & Engineering">Computer Science & Eng</option>
                <option value="Artificial Intelligence & DS">AI & Data Science</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Description *</label>
            <textarea 
              required
              rows={3}
              placeholder="Brief description of the material contents..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Tags (Comma Separated)</label>
            <input 
              type="text" 
              placeholder="e.g. C++, Trees, Algorithms, Question Paper"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Dummy File Upload Drag Box */}
          <div className="border-2 border-dashed border-gray-700 hover:border-emerald-500/50 rounded-xl p-4 text-center cursor-pointer bg-gray-900/40 transition-colors">
            <FileText className="w-8 h-8 text-emerald-400 mx-auto mb-1 opacity-80" />
            <p className="text-xs font-medium text-gray-300">Click to select PDF or ZIP file</p>
            <p className="text-[10px] text-gray-500 mt-0.5">Maximum file size: 25MB</p>
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
              className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-sm font-bold text-white shadow-lg shadow-emerald-500/20"
            >
              Publish Resource
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
