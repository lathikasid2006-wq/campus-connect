const Claim = require('../models/Claim');
const ItemReport = require('../models/ItemReport');
const FoundItem = require('../models/FoundItem');
const AuditLog = require('../models/AuditLog');

// Passenger claims an item with a digital signature
exports.createClaim = async (req, res) => {
  try {
    const { reportId, foundItemId, digitalSignature } = req.body;
    
    // Create the claim
    const claim = await Claim.create({
      itemReport: reportId,
      foundItem: foundItemId,
      passenger: req.user.id,
      digitalSignature
    });

    // Update statuses
    await ItemReport.findByIdAndUpdate(reportId, { status: 'Matched' });
    await FoundItem.findByIdAndUpdate(foundItemId, { status: 'Matched' });

    // Log the action
    await AuditLog.create({
      user: req.user.id,
      action: 'CLAIM_CREATED',
      details: `Passenger claimed item from report ${reportId} against found item ${foundItemId}`,
      targetId: claim._id
    });

    res.status(201).json(claim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Staff/Admin verify a claim
exports.verifyClaim = async (req, res) => {
  try {
    const { status } = req.body; // 'Verified', 'Rejected', 'Released'
    const claim = await Claim.findById(req.params.id);

    if (!claim) return res.status(404).json({ message: 'Claim not found' });

    claim.status = status;
    claim.staffValidator = req.user.id;
    await claim.save();

    if (status === 'Released') {
      await ItemReport.findByIdAndUpdate(claim.itemReport, { status: 'Claimed' });
      await FoundItem.findByIdAndUpdate(claim.foundItem, { status: 'Claimed' });
    }

    // Log the action
    await AuditLog.create({
      user: req.user.id,
      action: 'CLAIM_STATUS_UPDATED',
      details: `Claim status updated to ${status}`,
      targetId: claim._id
    });

    res.json(claim);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin/Staff fetch claims
exports.getClaims = async (req, res) => {
  try {
    const claims = await Claim.find().populate('itemReport').populate('foundItem').populate('passenger', 'name email');
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
