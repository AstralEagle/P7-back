const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const userRoute = require('./route/user');

app.use(express.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.post('/api/test',(req,res,next) => {
    console.log(req.query);
});
app.use('/api/auth',userRoute);




module.exports = app;

