const authmodel = require("../models/authmodel");

const register = async(req,res) =>{
    const {user,password} = req.body;
    const newuser = await authmodel.create({
        user:user,
        password:password
    });
    return res.status(201).json(
        {
            message: 'User registered successfully',
            user: newuser
        }
    );
}
const getAllUsers = async(req,res) =>{
    const users = await authmodel.find();
    return res.status(200).json({
        message:"All users fetched successfully",
        users
    })
}

const getUserById = async(req,res) =>{
    const id = req.params.id;
    const user = await authmodel.findById(id)
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }
    return res.status(200).json({
        message:"User fetched successfully",
        user
    })
}

const updateUserById = async(req,res) =>{
    const id = req.params.id;
    const {user,password} = req.body;
    const updatedUser = await authmodel.findByIdAndUpdate(id,{user,password},{new:true});
    if(!updatedUser){
        return res.status(404).json({
            message:"User not found"
        })
    }
    return res.status(200).json({
        message:"User updated successfully",
        updatedUser
    })
}

const deleteUserById = async(req,res) =>{
    const id= req.params.id;
    const deletedUser = await authmodel.findByIdAndDelete(id);
    if(!deletedUser){
        return res.status(404).json({
            message:"User not found"
        })
    }
    return res.status(200).json({
        message:"User deleted successfully",
        deletedUser
    })
}

module.exports = {
    register,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}