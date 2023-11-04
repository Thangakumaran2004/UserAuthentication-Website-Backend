//const redis = require( 'redis');
/*const dotenv = require('dotenv');

dotenv.config();

const client = redis.createClient({
    url: process.env.redis_URL
}).on('error',err=>console.log('Redis client Error',err)).on('connect',()=>console.log('Connected to redis server')).connect();

//const client = redisClient();

/*client.on("error",(err)=>{
    
    console.log("Error occured in redis");
    console.log(err);
    
})*/
/*
client.redis.on("connect", ()=>{
   
    console.log("Connected to redis");
});*/


/*client.on("end",()=>{
    console.log("Connection redis ended");
})


client.on("SIGQUIT", ()=>{
    client.quit(()=>{
        console.log("connection ended with redis");
    });
   
});*/
//module.exports = {client};*/