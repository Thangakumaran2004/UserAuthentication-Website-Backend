const express = require('express');
const router = express.Router();
const {AuthorizeUser} = require('../Controller/Login');




router.get('/',async (req,res)=>{

    try{
    const auth_token = await req.headers.authorization;
    console.log(`The Authorization token is${auth_token}`);

    const loginCredentials = await AuthorizeUser(auth_token);

    if(loginCredentials == false)
    {
        res.status(200).send("Invaid Token");
    }else{
        console.log(loginCredentials);
        res.status(200).json(loginCredentials);
    }
    }catch(e){
        console.log("error occcured!",e);
        res.status(400).send("Server Busy");
    }
})





module.exports = router;