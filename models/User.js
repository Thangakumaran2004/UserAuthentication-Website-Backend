const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    { 
        name :{
            type: String,
            required: true
        },
        email :{
            type: String,
            unique: true,
            required: true
        },
        password :{
            type: String,
            required: true
        },
        token :{
            type: String,
            required: true
        },
        forgotPassword:{
            time: Date,
            otp: String
        }

},
{
    collection: "User"
})


const UserModel = mongoose.model("User",UserSchema);

module.exports = {UserModel};