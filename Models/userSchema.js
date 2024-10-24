//import mongoose
const mongoose = require('mongoose');

//create schema
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
        
    },
    password:{
        type:String,
        require:true
    },
    github:{
        type:String,
    },
    linkedin:{
        type:String,
    },
    profile:{
        type:String,
    } 
})

//create model
//mongoose.model() method is used to create model, it accepts two arguments
//1) name of the collection that needs to map with this model 
//2) The schema created 
const users = mongoose.model("users",userSchema)

//Export the model
module.exports = users; 