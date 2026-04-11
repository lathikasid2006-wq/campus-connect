const mongoose = require('mongoose');

const itemReportSchema = new mongoose.Schema({
  passenger: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  photoUrl: { type: String },
  dateLost: { type: Date, required: true },
  timeLost: { type: String },
  placeLost: { type: String, required: true },
  uniqueIdentifiers: { type: String }, // e.g., IMEI, passport no
  category: { type: String }, // AI generated category
  status: { type: String, enum: ['Lost', 'Matched', 'Claimed'], default: 'Lost' }
}, { timestamps: true });

module.exports = mongoose.model('ItemReport', itemReportSchema);
