const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, role, gstin } = req.body;

        if (!name || !email || !password || !role || !gstin) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const user = await User.create({ name, email, password, role, gstin });

        const token = jwt.sign(
            { userId: user._id, role: user.role, gstin: user.gstin, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            success: true,
            data: {
                token,
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

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role, gstin: user.gstin, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            data: {
                token,
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

exports.switchRole = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const newRole = user.role === "seller" ? "buyer" : "seller";
        user.role = newRole;
        await user.save();

        const token = jwt.sign(
            { userId: user._id, role: user.role, gstin: user.gstin, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            data: {
                token,
                newRole
            }
        });
    } catch (err) {
        next(err);
    }
};
