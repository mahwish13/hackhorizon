const express = require('express');
const router = express.Router();
const { 
    createInvoice, 
    getSentInvoices, 
    getReceivedInvoices, 
    getInvoiceById, 
    updateStatus, 
    updatePaymentStatus 
} = require('../controllers/invoiceController');
const verifyToken = require('../middleware/auth');
const requireRole = require('../middleware/roleGuard');

// All routes are protected
router.use(verifyToken);

router.post('/', requireRole("seller"), createInvoice);
router.get('/sent', requireRole("seller"), getSentInvoices);
router.get('/received', requireRole("buyer"), getReceivedInvoices);
router.get('/:id', getInvoiceById);
router.patch('/:id/status', requireRole("buyer"), updateStatus);
router.patch('/:id/payment', requireRole("seller"), updatePaymentStatus);

module.exports = router;
