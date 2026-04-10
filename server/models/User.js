const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        unique: true,
        sparse: true,
        trim: true
    },
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true, 
        trim: true 
    },
    password: { 
        type: String, 
        minlength: 6 
    },
    role: { 
        type: String, 
        enum: ["seller", "buyer"], 
        default: "buyer"
    },
    gstin: { 
        type: String, 
        trim: true, 
        uppercase: true,
        default: ""
    },
    profilePicture: {
        type: String,
        default: ""
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('User', userSchema);
