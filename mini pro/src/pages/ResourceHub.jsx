import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Search, 
  Download, 
  Upload, 
  Filter, 
  FileText, 
  Star, 
  User, 
  Tag, 
  Eye, 
  X,
  CheckCircle2
} from 'lucide-react';

export const ResourceHub = ({ onOpenUpload }) => {
  const { resources, showToast } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedResource, setSelectedResource] = useState(null);

  const subjects = ['All', 'Data Structures', 'Artificial Intelligence', 'Web Development', 'DBMS', 'Operating Systems'];

  const filteredResources = resources.filter((res) => {
    const matchesSubject = selectedSubject === 'All' || res.subject === selectedSubject;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          res.uploader.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const handleDownload = (res) => {
    showToast(`Downloading file "${res.title}.${res.fileType.toLowerCase()}" (${res.fileSize})`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-gray-800">
        <div>
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Academic Resource Library</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Centralized Academic Resource Hub</h1>
          <p className="text-xs text-gray-400 mt-1">Explore, upload, and download subject notes, question banks, and lab manuals.</p>
        </div>

        <button
          onClick={onOpenUpload}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/20 transition-all shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Material</span>
        </button>
      </div>

      {/* Search Bar & Subject Filter Tabs */}
      <div className="space-y-4">
        
        {/* Search input */}
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search by subject, title, uploader, or tag (e.g. TF-IDF, Trees, C++, React)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900/90 border border-gray-800 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 shadow-inner"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs text-gray-400 font-semibold px-2 flex items-center space-x-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Subject:</span>
          </span>
          {subjects.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubject(sub)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                selectedSubject === sub
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                  : 'bg-gray-900/80 text-gray-300 hover:bg-gray-800 border border-gray-800'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

      </div>

      {/* Resource Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div key={res.id} className="glass-panel-interactive rounded-2xl p-5 flex flex-col justify-between border border-gray-800">
            
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {res.subject}
                </span>
                <div className="flex items-center space-x-1 text-amber-400 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{res.rating}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-white mb-2 line-clamp-2 hover:text-emerald-400 transition-colors cursor-pointer" onClick={() => setSelectedResource(res)}>
                {res.title}
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-4">
                {res.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {res.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] bg-gray-800/80 text-gray-300 px-2 py-0.5 rounded border border-gray-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center space-x-1">
                  <User className="w-3.5 h-3.5 text-gray-500" />
                  <span>{res.uploader} ({res.uploaderRole})</span>
                </span>
                <span className="text-gray-400 font-medium">{res.fileType} • {res.fileSize}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedResource(res)}
                  className="w-1/2 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-300 hover:text-white border border-gray-700 flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
                
                <button
                  onClick={() => handleDownload(res)}
                  className="w-1/2 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-xs font-bold text-emerald-400 border border-emerald-500/30 flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel w-full max-w-2xl rounded-2xl p-6 border border-gray-700 shadow-2xl relative">
            <button
              onClick={() => setSelectedResource(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {selectedResource.subject}
                </span>
                <h3 className="text-base font-bold text-white mt-1">{selectedResource.title}</h3>
              </div>
            </div>

            <div className="bg-gray-950 p-4 rounded-xl border border-gray-800 text-xs text-gray-300 space-y-2 mb-6">
              <p className="font-semibold text-gray-200">Material Document Overview:</p>
              <p className="leading-relaxed">{selectedResource.description}</p>
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-gray-400">
                <span>Department: {selectedResource.department}</span>
                <span>•</span>
                <span>Semester: {selectedResource.semester}</span>
                <span>•</span>
                <span>Uploader: {selectedResource.uploader}</span>
                <span>•</span>
                <span>Rating: ⭐ {selectedResource.rating}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedResource(null)}
                className="px-4 py-2 rounded-xl border border-gray-700 text-xs font-medium text-gray-300 hover:bg-gray-800"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  handleDownload(selectedResource);
                  setSelectedResource(null);
                }}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-xs font-bold text-white flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download {selectedResource.fileType} ({selectedResource.fileSize})</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
