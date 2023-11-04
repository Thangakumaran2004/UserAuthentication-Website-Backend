const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const SignInRoute = require('./Routes/SigninRoute');
const loginRoute= require('./Routes/LoginRoute');
const HomeRoute = require('./Routes/HomeRoute');

const app = express();
connectDB();

const port = 4000;




//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

app.use(express.json());
app.use(cors({origin:"*"}));
app.use('/signin',SignInRoute);
app.use('/login',loginRoute);
app.use('/home',HomeRoute);



app.listen(port,()=>
{
    console.log("Successfully opened a port in ", port);
})