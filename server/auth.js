const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

const userSchema = new mongoose.Schema({
    email : String ,
    password : String
})

const User = new mongoose.model('User' , userSchema);

mongoose.connect("mongodb+srv://shreyas:Shreyasreddy@auth.nyo74jn.mongodb.net/?retryWrites=true&w=majority&appName=Auth");

app.post("/signup" , async(req , res) => {
    const {email, password} = req.body;

    try{
       if(!email || !password) return res.status(400).json({error : "Enter email and password"});

       const existing = await User.findOne({email});
       if(existing) return res.status(409).json({error : "email already registered"});

       const hash = await bcrypt.hash(password , 10);

       const newUser = new User({email : email , password : hash});
       await newUser.save();

       res.status(201).json({message : "User registered successfully"});
    }catch(err){
        console.error(err);
        res.status(500).json({error : "Internal server error"});
    }
});

app.post("/login" , async(req , res) => {
    const {email , password} = req.body;

    try{
        const foundUser = await User.findOne({email});
        if(!foundUser){
           return res.status(401).json({error : "Invalid email"});
        }

        const match = await bcrypt.compare(password , foundUser.password);
        if(match){
            res.status(200).json({message : "User successfully logged in"});
        }else{
            res.status(500).json({error : "Invalid password"});
        }
    }catch ( err ){
        console.error(err);
        res.status(501).json({error : "Internal server error"});
    }
});

app.listen(6969 , () => {
    console.log("server started");
})