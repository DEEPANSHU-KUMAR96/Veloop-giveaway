import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { config } from '../config/config.js';

const generateToken = (id) => {
    return jwt.sign({ id }, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES_IN || '15m'
    });
};

// POST /api/auth/register
export const registerHandler = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'fullName, email and password are required'
            });
        }

        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Give new users some starting balance for testing
        const user = await User.create({
            fullName,
            email,
            password,
            VEs: 1000,
            SVEs: 500,
            Tokens: 5000,
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            token,
            data: {
                id: user._id,
                displayId: user.displayId,
                fullName: user.fullName,
                email: user.email,
                VEs: user.VEs,
                SVEs: user.SVEs,
                Tokens: user.Tokens,
                role: user.role,
            }
        });

    } catch (error) {
        next(error);
    }
};

// POST /api/auth/login
export const loginHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Explicitly select password since it is select:false in schema
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: 'Your account has been deactivated'
            });
        }

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            data: {
                id: user._id,
                displayId: user.displayId,
                fullName: user.fullName,
                email: user.email,
                VEs: user.VEs,
                SVEs: user.SVEs,
                Tokens: user.Tokens,
                role: user.role,
            }
        });

    } catch (error) {
        next(error);
    }
};

// GET /api/auth/me
export const getMeHandler = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                displayId: user.displayId,
                fullName: user.fullName,
                email: user.email,
                VEs: user.VEs,
                SVEs: user.SVEs,
                Tokens: user.Tokens,
                role: user.role,
            }
        });

    } catch (error) {
        next(error);
    }
};