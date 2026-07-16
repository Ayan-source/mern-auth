const asyncHandler = (fn) => async (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
module.exports = asyncHandler;


// instead of using try and catch again and again in the code we use this to try and catch
// example controller with async asyncHandler


// const asyncHandler = require('../utils/asyncHandler');
// const User = require('../models/userModel');

// const getUser = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//         res.status(404);
//         throw new Error("User not found"); // Ye error automatically catch ho jayega
//     }
//     res.status(200).json(user);
// });