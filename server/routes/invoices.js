const express = require('express');
const router = express.Router();
const { getInvoices, createInvoice } = require('../controllers/invoiceController');
const auth = require('../middleware/auth');

router.get('/', auth, getInvoices);
router.post('/', auth, createInvoice);

module.exports = router;
