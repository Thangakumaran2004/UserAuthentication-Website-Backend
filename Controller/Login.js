const {UserModel} = require('../models/User');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
//const {client} = require('../Redis');
//const redis = require('redis');

dotenv.config();

async function Checkuser (email)
{
    try{
        const user = await UserModel.findOne({email : email});
        if(user){
            return true;
        }
        return false;
    }
    catch(error)
    {
        console.log("Error occured in checking if user already exists..\n",error);
        return "Server Busy";
    }
} 


async function AuthenticateUser(email,password){
    try{
        const userCheck = await UserModel.findOne({email : email});
        const validPass = await bcrypt.compare(password,userCheck.password);
        if(validPass)
        {
            const token = jwt.sign({email},process.env.login_secret_token);
            const response = {
                id: userCheck.id,
                name: userCheck.name,
                email: userCheck.email,
                token: token,
                status: true
            }
            console.log(response);

            //await client.set(`key-${email}`,JSON.stringify(response));

            await UserModel.findOneAndUpdate(
                {email: userCheck.email},
                {$set: {token: response.token}}
               // {new: true}
                );

           // updatedUser = await UserModel.findOne({email: response.email});
            //console.log(updatedUser);
            return response;
        }
        return "Invalid UserName or Password";

    }catch(e){
        console.log("Error Occured in Authentication",e);
        return "Server Busy";
    }
}


async function AuthorizeUser(token){
    try{
        const decodedToken = jwt.verify(token,process.env.login_secret_token);
        console.log(`The Decoded token email is ${decodedToken.email}`);

        if(decodedToken){
            const email = decodedToken.email;
          //  const auth = await client.get(`key-${email}`);

         /*   if(auth)
            {
                const data = JSON.parse(auth);
                return data;
            }
            else{*/
                const data = await UserModel.findOne({email:email});
                return data;
            //}
        }
        return false;

    }catch(e){
        console.log("Error Occured",e);
    }
}

module.exports = {Checkuser,AuthenticateUser,AuthorizeUser};