const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  itemReport: { type: mongoose.Schema.Types.ObjectId, ref: 'ItemReport', required: true },
  foundItem: { type: mongoose.Schema.Types.ObjectId, ref: 'FoundItem', required: true },
  passenger: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  digitalSignature: { type: String, required: true }, // Completed signature
  status: { type: String, enum: ['Pending Verification', 'Verified', 'Rejected', 'Released'], default: 'Pending Verification' },
  staffValidator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Claim', claimSchema);
