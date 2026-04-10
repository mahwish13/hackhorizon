const mongoose = require('mongoose');

const invoiceRequestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    details: { type: String, required: true },
    status: { type: String, enum: ['requested', 'approved', 'rejected'], default: 'requested' }
}, { timestamps: true });

module.exports = mongoose.model('InvoiceRequest', invoiceRequestSchema);
