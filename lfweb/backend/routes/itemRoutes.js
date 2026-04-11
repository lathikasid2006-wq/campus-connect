const express = require('express');
const router = express.Router();
const { reportLostItem, logFoundItem, getMyReports, getFoundItems, findMatches } = require('../controllers/itemController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Passenger routes
router.post('/report', protect, authorize('Passenger'), reportLostItem);
router.get('/my-reports', protect, authorize('Passenger'), getMyReports);

// Staff routes
router.post('/found', protect, authorize('Staff'), logFoundItem);
router.get('/found-items', protect, authorize('Staff', 'Admin'), getFoundItems);

// Common/Match routes
router.get('/matches/:id', protect, findMatches);

module.exports = router;
