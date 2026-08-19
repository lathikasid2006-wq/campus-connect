import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  organizer: { type: String, default: 'Department of Information Technology' },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, default: 'Hackathon' },
  description: { type: String, required: true },
  attendeesCount: { type: Number, default: 1 },
  isRegistered: { type: Boolean, default: true },
  badgeColor: { type: String, default: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  createdAt: { type: Date, default: Date.now }
});

export const Event = mongoose.model('Event', EventSchema);
