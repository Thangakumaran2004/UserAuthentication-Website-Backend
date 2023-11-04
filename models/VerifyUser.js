// This page is to create a schema for veryfying new user... When a new user sign ins we send a mail to his account for verification. 
// Once he verified, We add him to our Users.

const mongoose = require('mongoose');

const VerifySchema = new mongoose.Schema(
    { 
        name :{
            type: String,
            required: true
        },
        email :{
            type: String,
            required: true
        },
        password :{
            type: String,
            required: true
        },
        token :{
            type: String,
            required: true
        }

},
{
    collection: "VerifyUser"
})


const VerifyUserModel = mongoose.model("VerifyUser",VerifySchema);

module.exports = {VerifyUserModel};