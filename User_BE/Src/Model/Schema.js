//Require
const mongoose = require('mongoose');

//Schema
const Users = new mongoose.Schema({
    Username :{
        type: String,
        required: true,
        collection: String
    },
    Email :{
        type: String,
        required: true,
        
    },
    Password:{
        type: String,
        required : true
    },
    Age:{
        type:Number,
        require:true
    },
    DOB:{
        type:Date,
        require:true
    },
    Gender:{
        type:String,
        require:true
    },
    City:{
        type:String,
        require:true
    },
    Mobile:{
        type:Number,
        require:true
    }
},{timestamps : true})

//Export;
module.exports = mongoose.model('Users',Users,"User_Data");

