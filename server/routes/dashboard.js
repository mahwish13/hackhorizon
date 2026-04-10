const express = require('express');
const router = express.Router();
const { 
    getSellerDashboard, 
    getBuyerDashboard, 
    getGstSummary 
} = require('../controllers/dashboardController');
const verifyToken = require('../middleware/auth');
const requireRole = require('../middleware/roleGuard');

// All routes are protected
router.use(verifyToken);

router.get('/seller', requireRole("seller"), getSellerDashboard);
router.get('/buyer', requireRole("buyer"), getBuyerDashboard);
router.get('/gst', getGstSummary);

module.exports = router;
