const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const { claimId, rating, comments } = req.body;
    const feedback = await Feedback.create({
      passenger: req.user.id,
      claim: claimId,
      rating,
      comments
    });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('passenger', 'name email').populate('claim');
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
