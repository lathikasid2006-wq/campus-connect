const ItemReport = require('../models/ItemReport');
const FoundItem = require('../models/FoundItem');

// Passenger reports a lost item
exports.reportLostItem = async (req, res) => {
  try {
    const { itemName, description, photoUrl, dateLost, timeLost, placeLost, uniqueIdentifiers } = req.body;
    
    // Mock AI Categorization
    let category = 'Other';
    const text = (itemName + ' ' + description).toLowerCase();
    if (text.includes('phone') || text.includes('mobile')) category = 'Phone';
    else if (text.includes('document') || text.includes('passport') || text.includes('id')) category = 'Document';
    else if (text.includes('suitcase') || text.includes('bag') || text.includes('luggage')) category = 'Luggage';

    const itemReport = await ItemReport.create({
      passenger: req.user.id,
      itemName, description, photoUrl, dateLost, timeLost, placeLost, uniqueIdentifiers, category
    });

    res.status(201).json(itemReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Staff logs a found item
exports.logFoundItem = async (req, res) => {
  try {
    const { itemName, description, photoUrl, dateFound, timeFound, locationFound } = req.body;
    
    let category = 'Other';
    const text = (itemName + ' ' + description).toLowerCase();
    if (text.includes('phone') || text.includes('mobile')) category = 'Phone';
    else if (text.includes('document') || text.includes('passport') || text.includes('id')) category = 'Document';
    else if (text.includes('suitcase') || text.includes('bag') || text.includes('luggage')) category = 'Luggage';

    const foundItem = await FoundItem.create({
      staff: req.user.id,
      itemName, description, photoUrl, dateFound, timeFound, locationFound, category
    });

    res.status(201).json(foundItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Passenger fetches their active reports
exports.getMyReports = async (req, res) => {
  try {
    const reports = await ItemReport.find({ passenger: req.user.id });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Staff fetches all found items
exports.getFoundItems = async (req, res) => {
  try {
    const foundItems = await FoundItem.find({});
    res.json(foundItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Match algorithm (fetch matches for a specific report)
exports.findMatches = async (req, res) => {
  try {
    const reportId = req.params.id;
    const report = await ItemReport.findById(reportId);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    // Mock match logic: finding items with the same category and currently 'Found'
    const matches = await FoundItem.find({ category: report.category, status: 'Found' });
    
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
