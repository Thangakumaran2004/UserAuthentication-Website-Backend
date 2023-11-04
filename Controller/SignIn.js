const {VerifyUserModel} = require("../models/VerifyUser");
const {UserModel} = require("../models/User");
const {sendMail} = require("./Mail");
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();






async function InsertVerifyUser(name,email,password){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const token = generateToken(email);

        const newUser = VerifyUserModel({
            name: name,
            email: email,
            password: hashedPassword,
            token: token
        })
        const activationLink = `http://localhost:4000/signin/${token}`;
        const content = `<h4> Hi, there </h4>
        <h5> Welcome to the app</h5>
        <p>Thankyou for Signing up. Click on the below link to activate</p>
        <a href="${activationLink}">Click here</a>
        <p>Regards</p>
        <p>Team</p>`

        await newUser.save();
        sendMail(email,"Verifying User",content);
        
    }catch(e){

    }
}



function generateToken(email){
    const token = jwt.sign(email,process.env.signup_Secret_Token);
    return token;
}



async function InsertSignUpUser(token){
    try{
    const userVerify = await VerifyUserModel.findOne({token:token});
    
        if(userVerify){
            const newUser = new UserModel({
                name: userVerify.name,
                email: userVerify.email,
                password: userVerify.password,
                token:token,
                forgetPassword: {}
            });

            await newUser.save();
            await userVerify.deleteOne({token:token});

            const content = `<h4>Registration Successfull</h4>
            <h5> Welcome to the app</h5>
            <p>You Registered Successfully</p>
            <p>Regards</p>
            <p>Team</p>`;

            sendMail(newUser.email,"Registration Successfull",content);

            return `<h4>Registration Successfull</h4>
            <h5> Welcome to the app</h5>
            <p>You Registered Successfully</p>
            <p>Regards</p>
            <p>Team</p>`;
        }
        return `<h4>Registration Failed</h4>
        <h5> User cant be verified</h5>
        <p>Your Registeration failed</p>
        <p>Regards</p>
        <p>Team</p>`;
    }catch(e){
        console.log("Unexpected Error Occured",e);
        return `
        <html>
        <body>
        <h4>Unexpected Error Occured</h4>
        <h5> Welcome to the app</h5>
        <p>You Registered failed</p>
        <p>Regards</p>
        <p>Team</p>
        </body>
        </html>`;
    }
}


module.exports ={InsertVerifyUser,InsertSignUpUser};