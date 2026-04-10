const User = require('../models/User');

// Get current user
exports.getCurrentUser = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    gstin: user.gstin,
                    profilePicture: user.profilePicture
                }
            }
        });
    } catch (err) {
        next(err);
    }
};

// Switch user role
exports.switchRole = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const newRole = user.role === "seller" ? "buyer" : "seller";
        user.role = newRole;
        await user.save();

        res.status(200).json({
            success: true,
            data: {
                newRole,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    gstin: user.gstin
                }
            }
        });
    } catch (err) {
        next(err);
    }
};

// Update user GSTIN
exports.updateGstin = async (req, res, next) => {
    try {
        const { gstin } = req.body;

        if (!gstin) {
            return res.status(400).json({ success: false, message: "GSTIN is required" });
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { gstin },
            { new: true }
        );

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    gstin: user.gstin
                }
            }
        });
    } catch (err) {
        next(err);
    }
};

// Logout
exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.status(200).json({ 
            success: true, 
            message: "Logged out successfully" 
        });
    });
};
