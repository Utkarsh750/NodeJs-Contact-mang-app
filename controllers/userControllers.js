const asyncHandler = require("express-async-handler")
const User = require("../models/userModels")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// desc Register a user
// @route POST /api/users/register
// @access public

const registerUser = asyncHandler(async  (req,res) => {
    const { username, email, password } = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({ email });
    if(userAvailable){
        res.status(400)
        throw new Error("User already registered")
    }
    // Hash password
    const hashedPasssword = await bcrypt.hash(password, 10)
    console.log("Hashed password: " + hashedPasssword) // this hashPassword will going to store on our DB so that we can prevent or have the security
    const user = await User.create({
        username,
        email,
        password : hashedPasssword 
    })

    console.log(`user created successfully ${user}`)
    if(user){
        res.status(201).json({ _id: user.id, email: user.id })
    }
    else{
        res.status(400)
        throw new Error("User data is not valid")
    }
    res.json({message: "Register new users"})
})


// desc Login user
// @route POST /api/users/login
// @access public

const loginUser = asyncHandler(async  (req,res) => {
    const { email , password } = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("All field are mandatory")
    }
    const user = await User.findOne({ email });
    //compare password with hashing password

    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },
        },process.env.ACCESS_TOKEN_SECRET,{ expiresIn: "1m" });
        res.status(200).json({ accessToken })
    }
    else{
        res.status(400)
        throw new Error("email or password is not valid")
    }
})


// desc Current user
// @route POST /api/users/current
// @access private

const currentUser = asyncHandler(async  (req,res) => {
    res.json({message: "Current users"})
})

module.exports = {registerUser, loginUser, currentUser}