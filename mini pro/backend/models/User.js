import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  regNo: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Student', 'Admin'], default: 'Student' },
  department: { type: String, default: 'Information Technology' },
  year: { type: String, default: '3rd Year' },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  skills: [{ type: String }],
  interests: [{ type: String }],
  bio: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', UserSchema);
