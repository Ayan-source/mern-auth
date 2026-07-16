const usermodel = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
    try {
        const { firstname, lastname, email, password, DOB, Age, isVerified, Role } = req.body;
        
        if (!firstname || !lastname || !email || !password || !DOB || !Age) {
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const existingUser = await usermodel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newuser = await usermodel.create({
            firstname,
            lastname,
            email,
            password: hashedPassword,
            DOB,
            Age,
            isVerified: isVerified !== undefined ? isVerified : false,
            Role: Role || 'user',
            CreatedAt: new Date(),
            UpdatedAt: new Date()
        });

        const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        const userObj = newuser.toObject();
        delete userObj.password;

        return res.status(201).json({
            message: 'User registered successfully',
            user: userObj,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await usermodel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            })
        }
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        const userObj = existingUser.toObject();
        delete userObj.password;

        return res.status(200).json({
            message: "User logged in successfully",
            user: userObj
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
const getAllUsers = async (req, res) => {
    try {
        const users = await usermodel.find();
        return res.status(200).json({
            message: "All users fetched successfully",
            users
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await usermodel.findById(id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "User fetched successfully",
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = { ...req.body, UpdatedAt: new Date() };
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        const updatedUser = await usermodel.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "User updated successfully",
            updatedUser
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await usermodel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            message: "User deleted successfully",
            deletedUser
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        });
        return res.status(200).json({
            message: "User logged out successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {
    signup,
    login,
    logout,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}