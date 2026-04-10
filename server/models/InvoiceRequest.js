const mongoose = require('mongoose');

const invoiceRequestSchema = new mongoose.Schema({
    buyerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    buyerGstin: { 
        type: String, 
        required: true, 
        uppercase: true 
    },
    sellerGstin: { 
        type: String, 
        required: true, 
        uppercase: true 
    },
    note: { 
        type: String, 
        trim: true, 
        default: "" 
    },
    status: { 
        type: String, 
        enum: ["pending", "fulfilled"], 
        default: "pending" 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('InvoiceRequest', invoiceRequestSchema);
