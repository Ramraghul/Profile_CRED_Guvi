const User = require('../Model/Schema');
require('dotenv').config()
const express = require('express');
const Path = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let Secret = process.env.SEC

Path.get('/', (req, res) => {
    res.send('<h1>Its Working..!</h1>')
})

Path.post('/Register', async (req, res) => {
    try {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(req.body.Password, salt)
        req.body.Password = hash

        let inward = new User(req.body);
        inward.save().then(() => {
            res.status(201).json({ Message: "Register Done" })
        })
    } catch (error) {
        res.status(500).json({Message:"Something Went Wrong",error})
    }
})

Path.post('/Login', async (req, res) => {
    try {
        let Match = req.body.Email;
        let mail = await User.findOne({ Email: Match })
        if (mail === null) {
            res.status(404).json({ Message: "User Not Found" });
        }
        let compare = await bcrypt.compare(req.body.Password, mail.Password);

        if (compare) {
            let token = jwt.sign({ _id: mail._id }, Secret, { expiresIn: '60m' });
            res.json({Token:token,ID:mail._id,Person:mail});
        } else {
            res.status(404).json({ Message: "Password wrong" });
        }
    } catch (error) {
        res.status(500).json({Message:"Something Went Wrong",error})
    }
})

Path.get('/Detail/:id',async(req,res)=>{
    try {
        let Person = req.params.id;
        let mail = await User.findOne({_id: Person })
        if (mail === null) {
            res.status(404).json({ Message: "Please Login first" });
        }else{
            res.status(200).json({Data:mail})
        }
    } catch (error) {
        res.status(500).json({Message:"Something Went Wrong",error})
    }
})

Path.put('/Update/:id',(req,res)=>{
    try {
        let Update = req.params.id;
        let Data = req.body
        User.findOneAndUpdate({_id: Update },Data,{new: true},(err,data)=>{
            if(err){
                throw err
            }
            res.status(204).json({Message:"Successfully Update"})
        })
    } catch (error) {
        res.status(500).json({Message:"Something Went Wrong",error})
    }
})

module.exports = Path