const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.nodemailer_User,
      pass: process.env.nodemailer_Password,
    },
  });

  function sendMail(toEmail, subject, content){
    const mailOptions = {
        from: "xyzuvw909@gmail.com",
        to: toEmail,
        subject: subject,
        html: content
    };

    transporter.sendMail(mailOptions,(error, info)=>{
        if(error){
            console.log("Error Occured in sending Mail\n", error);
        }
        else{
            console.log("Email Send successfully\n", info.response);
        }
    });
  };


module.exports =  {sendMail};