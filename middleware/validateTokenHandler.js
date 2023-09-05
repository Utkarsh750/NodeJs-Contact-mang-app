const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler(async(req,res,next) => {
    let token;
    let authHeader = req.headers.Authorization || req.header.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,decoded)=> {
            if(err){
                res.status(401)
                throw new Error("user is not authorised")
            }
            req.user = decoded.user
            next();

        })
        if(!token){
            res.status(401);
            throw new Error("user is not authorised or missing")
        }
    }
}) 


module.exports = validateToken