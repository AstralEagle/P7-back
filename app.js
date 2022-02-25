const express = require('express');
const bodyParser = require('body-parser');

var nbrRequests = 0;
const app = express();
const path = require('path');

const userRoute = require('./route/user');
const postRoute = require('./route/post');
const accesRoute = require('./route/acces');
const channelRoute = require('./route/channel');
const messageRoute = require('./route/message');
const reportRoute = require('./route/report');

const multer = require('./midleware/multer')
const auth = require('./midleware/auth')

const database = require('./config/DB');

const db = database.getDB();



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
 
app.use(express.json());

app.use('/api/auth',userRoute); 
app.use('/api/post',postRoute);
app.use('/api/acces',accesRoute)
app.use('/api/channel',channelRoute);
app.use('/api/message',messageRoute);
app.use('/api/report',reportRoute);
app.use('/images', express.static(path.join(__dirname, 'images')));



//Connect Route
app.get('/api/connect',auth,(req,res)=>{
        res.status(200).json({succes : "Connected"});
})

// Test Route
app.post('/api/test',multer,(req,res, next)=>{
  
  const valeurs = req.file?
  {
    ...JSON.parse(req.body.message),
    imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }:{...req.body};
  console.log(valeurs)


  if(req.file){
    res.status(200).json({message : "test"})
  }
  else{
    res.status(400).json({error : "test"})
  }
})




module.exports = app;

