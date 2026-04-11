const express = require('express');
const router = express.Router();
const { submitFeedback, getFeedback } = require('../controllers/feedbackController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('Passenger'), submitFeedback);
router.get('/', protect, authorize('Admin', 'Staff'), getFeedback);

module.exports = router;
