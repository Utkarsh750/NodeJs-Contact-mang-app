const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:string,
        required: [true, "Pleas add the user name"],
    },

    email:{
        type:string,
        required: [true, "Pleas add the email"],
        unique: [true, "email already taken"],
    },

    password: {
        type:string,
        required: [true, "Please add the user password"],
    },
},
 {
    timestamps: true,
}
)