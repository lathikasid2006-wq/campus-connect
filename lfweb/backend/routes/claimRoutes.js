const express = require('express');
const router = express.Router();
const { createClaim, verifyClaim, getClaims } = require('../controllers/claimController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('Passenger'), createClaim);
router.put('/:id/verify', protect, authorize('Staff', 'Admin'), verifyClaim);
router.get('/', protect, authorize('Staff', 'Admin'), getClaims);

module.exports = router;
