const express = require('express');
const bodyParser = require('body-parser');

var nbrRequests = 0;
const app = express();
const userRoute = require('./route/user');
const postRoute = require('./route/post');
const accesRoute = require('./route/acces');
const channelRoute = require('./route/channel');
const messageRoute = require('./route/message');
const reportRoute = require('./route/report');

const auth = require('./midleware/auth')

const database = require('./config/DB');

const db = database.getDB();



app.use(express.json());
app.use((req, res, next) => {
  nbrRequests++;
  console.log("request: " + nbrRequests);
  console.log("=>  "+req.method + req.originalUrl)


  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use('/api/auth',userRoute); 
app.use('/api/post',postRoute);
app.use('/api/acces',accesRoute)
app.use('/api/channel',channelRoute);
app.use('/api/message',messageRoute);
app.use('/api/report',reportRoute);


//Connect Route
app.get('/api/connect',auth,(req,res)=>{
        res.status(200).json({succes : "Connected"});
})

// Test Route
app.get('/api/test',(req,res) => {
  console.log(req)
  console.log(req.url,req.method)
  res.status(200).json({message : "Succes"})
  
})




module.exports = app;

