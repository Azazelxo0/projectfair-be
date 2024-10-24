const router = require('./Router/router')


//import dotenv module
require('dotenv').config()

//import express module 
const express= require('express')

require('./DB/connections')

//import cors module 
const cors = require('cors')

//create server using express 
const pfServer = express()

//inject cors into pfServer 
pfServer.use(cors())

//use middleware to convert JSON data to js object 
pfServer.use(express.json())
pfServer.use(router)

//provide port 

const PORT=4000;

//run the server 
pfServer.listen(PORT,()=>{
    console.log('pfserver is running in PORT',PORT);
    
})

pfServer.get('/',(req,res)=>{
    res.send("server for project fair!!!")
})