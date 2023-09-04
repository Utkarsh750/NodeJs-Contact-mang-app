const express = require("express")

const router = express.Router()


router.post('/register', (req,res) => {
    res.json({message: "Register new users"})
})
router.post('/login', (req,res) => {
    res.json({message: "Login new users"})
})
router.get('/current', (req,res) => {
    res.json({message: "Current users"})
})


module.exports = router