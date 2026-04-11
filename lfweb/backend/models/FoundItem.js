const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema({
  staff: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  itemName: { type: String, required: true },
  description: { type: String, required: true },
  photoUrl: { type: String },
  dateFound: { type: Date, required: true },
  timeFound: { type: String },
  locationFound: { type: String, required: true },
  category: { type: String }, // AI generated category
  status: { type: String, enum: ['Found', 'Matched', 'Claimed'], default: 'Found' }
}, { timestamps: true });

module.exports = mongoose.model('FoundItem', foundItemSchema);
