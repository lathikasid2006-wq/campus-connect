import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Plus, 
  CheckCircle2, 
  Filter, 
  Share2,
  Sparkles
} from 'lucide-react';

export const EventManagement = ({ onOpenCreateEvent }) => {
  const { events, toggleEventRegistration, currentUser } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Hackathon', 'Workshop', 'Symposium', 'Seminar'];

  const filteredEvents = events.filter((evt) => {
    if (selectedCategory === 'All') return true;
    return evt.category === selectedCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-gray-800 bg-gradient-to-r from-blue-950/30 via-gray-900 to-gray-900">
        <div>
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Calendar className="w-4 h-4" />
            <span>Campus Event Hub</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Campus Events & Tech Symposia</h1>
          <p className="text-xs text-gray-400 mt-1">Discover, register, and manage upcoming hackathons, guest lectures, and department workshops.</p>
        </div>

        <button
          onClick={onOpenCreateEvent}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Event</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <span className="text-xs text-gray-400 font-semibold px-2 shrink-0">Category:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
              selectedCategory === cat
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20'
                : 'bg-gray-900/80 text-gray-300 hover:bg-gray-800 border border-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((evt) => (
          <div key={evt.id} className="glass-panel-interactive rounded-2xl p-5 flex flex-col justify-between border border-gray-800 relative">
            
            <div>
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${evt.badgeColor || 'bg-blue-500/20 text-blue-300 border-blue-500/30'}`}>
                  {evt.category}
                </span>
                <span className="text-xs text-gray-400 font-medium flex items-center space-x-1">
                  <Users className="w-3.5 h-3.5 text-gray-500" />
                  <span>{evt.attendeesCount} Registered</span>
                </span>
              </div>

              <h3 className="text-base font-bold text-white mb-2 line-clamp-2">
                {evt.title}
              </h3>

              <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 mb-4">
                {evt.description}
              </p>

              {/* Event details metadata */}
              <div className="space-y-1.5 text-xs text-gray-300 bg-gray-900/60 p-3 rounded-xl border border-gray-800/80 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{evt.location}</span>
                </div>
              </div>
            </div>

            {/* Registration action */}
            <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between">
              <span className="text-[11px] text-gray-400 truncate max-w-[140px]">
                By {evt.organizer}
              </span>

              <button
                onClick={() => toggleEventRegistration(evt.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm ${
                  evt.isRegistered
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-blue-500/20'
                }`}
              >
                {evt.isRegistered ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Registered</span>
                  </>
                ) : (
                  <span>Register Now</span>
                )}
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
