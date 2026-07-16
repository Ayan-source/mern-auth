const authmodel = require("../models/authmodel");
const usermodel = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
    const { firstname, lastname, email, password, DOB, Age, isVerified, Role, CreatedAt, UpdatedAt } = req.body;
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
        return res.status(400).json({
            message: "User already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newuser = await usermodel.create({
        user: user,
        password: hashedPassword
    });

    const token = jwt.sign({ id: newuser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });


    return res.status(201).json(
        {
            message: 'User registered successfully',
            user: newuser,
        }
    );
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
        });
        return res.status(200).json({
            message: "User logged in successfully",
            user: existingUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
const getAllUsers = async (req, res) => {
    const users = await authmodel.find();
    return res.status(200).json({
        message: "All users fetched successfully",
        users
    })
}

const getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await authmodel.findById(id)
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    return res.status(200).json({
        message: "User fetched successfully",
        user
    })
}

const updateUserById = async (req, res) => {
    const id = req.params.id;
    const { user, password } = req.body;
    const updatedUser = await authmodel.findByIdAndUpdate(id, { user, password }, { new: true });
    if (!updatedUser) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    return res.status(200).json({
        message: "User updated successfully",
        updatedUser
    })
}
const deleteUserById = async (req, res) => {
    const id = req.params.id;
    const deletedUser = await authmodel.findByIdAndDelete(id);
    if (!deletedUser) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    return res.status(200).json({
        message: "User deleted successfully",
        deletedUser
    })
}

module.exports = {
    signup,
    login,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}