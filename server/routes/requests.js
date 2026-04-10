const express = require('express');
const router = express.Router();
const { 
    createRequest, 
    getBuyerRequests, 
    getSellerIncomingRequests, 
    fulfillRequest 
} = require('../controllers/requestController');
const verifyToken = require('../middleware/auth');
const requireRole = require('../middleware/roleGuard');

// All routes are protected
router.use(verifyToken);

router.post('/', requireRole("buyer"), createRequest);
router.get('/mine', requireRole("buyer"), getBuyerRequests);
router.get('/incoming', requireRole("seller"), getSellerIncomingRequests);
router.patch('/:id/fulfill', requireRole("seller"), fulfillRequest);

module.exports = router;
