const asyncHandler = require("express-async-handler")
// desc Register a user
// @route POST /api/users/register
// @access public

const registerUser = asyncHandler(async  (req,res) => {
    res.json({message: "Register new users"})
})


// desc Login user
// @route POST /api/users/login
// @access public

const loginUser = asyncHandler(async  (req,res) => {
    res.json({message: "Login new users"})
})


// desc Current user
// @route POST /api/users/current
// @access public

const currentUser = asyncHandler(async  (req,res) => {
    res.json({message: "Current users"})
})

module.exports = {registerUser, loginUser, currentUser}