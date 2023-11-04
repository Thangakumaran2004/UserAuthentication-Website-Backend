const express = require('express');
const {Checkuser} = require('../Controller/Login');
const { InsertVerifyUser,InsertSignUpUser } = require('../Controller/SignIn');
const router = express.Router();


router.get('/:token',async (req,res)=>{
    
    try{
        const response = await InsertSignUpUser(String(req.params.token));
        res.status(200).send(response);
    }catch(e){
        console.log(e);
        res.status(500).send(
            `
            <html>
            <body>
            <h4>Link Expired</h4>
            <h5> Welcome to the app</h5>
            <p>You Registered failed</p>
            <p>Regards</p>
            <p>Team</p>
            </body>
            </html>
            `
        )
    }
});

router.post('/verify',async (req,res)=>{
    const {name,email,password} =  await req.body;
    console.log( name,email,password);
    const registerCredentials = await Checkuser(email);
    try{
        if(registerCredentials == true)
        {
            res.status(200).send(false);
        }else if(registerCredentials == false)
        {
            await InsertVerifyUser(name,email,password);
            res.status(200).send(true);
            //res.status(200).send(false);
        }
        else if(registerCredentials == "Server Busy")
        {
            res.status(500).send("server is busy");
        }
    }catch(err){
        console.log("Error Occured in checking Register Credentials",err);
    }

});


module.exports = router;