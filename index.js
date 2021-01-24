const express = require('express');
const router = require('./Routers');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017/nodeproject' , { useUnifiedTopology: true });

app.use(express.json());//middleware to convert json object in body to js

console.log('start');


app.use('/', router);

app.use((req , res , next)=>{
    res.status(404).json('not found');
});

//error handler
app.use((err,req , res , next)=>{
    //if error from DB connect(mongoos)
    
    if(err instanceof mongoose.Error.ValidationError){
      res.status(422).json(err.errors);
    }
    //the error from mongo DB
    if(err.code === 11000){
      res.status(422).json({ "err":err.keyValue }); 
    }
    if(err.message === 'UN_AUTHENTICATED'){
      res.status(401).json(err.errors);
    }  
  
    console.log(err);
    //for server error
    res.status(503).end();
  
  });
const {PORT=3500} = process.env;
app.listen(PORT);