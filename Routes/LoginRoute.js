const express = require('express');
const router = express.Router();
const {CheckUser,AuthenticateUser} = require('../Controller/Login');


router.get('/', async (req,res)=>{

});


router.post('/', async (req,res)=>{
    let {email,password} = await req.body;
    console.log(email,password);
    var loginCredentials = await AuthenticateUser(email,password);

    if(loginCredentials=="Invalid UserName or Password")
    {
        res.status(200).send("Invalid User Name or Password");
    }
    else if(loginCredentials =="Server Busy")
    {
        res.status(200).send("Server Busy");
    }
    else
    {
        res.status(200).json({token : loginCredentials.token});
    }


});



module.exports = router;