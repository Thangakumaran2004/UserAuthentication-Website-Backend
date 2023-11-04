const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB =  async () =>{
    try{
        await mongoose.connect(process.env.mongoDB_URL)
        console.log("Connected to MongodB database");
    }
    catch(error){
        console.log(error);
    }
};


module.exports = connectDB;