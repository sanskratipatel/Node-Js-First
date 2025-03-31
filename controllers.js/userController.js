const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const registerUser = async(req,res) =>{ 
    const {username,email,password} = req.body;
    try{ 
        const userExists = await User.findOne({ email });
        if (userExists) 
            return res.status(400).json({message:"User Already exists"});
        const user = await user.create({username,email,password});
        res.status(201).json({userId:user._id,token :generateToken (user._id)}) ; 
    } 
    catch { 
          res.status(500).json({message:error.message});
    } 

};  


const loginUaser = async (req,res) => { 
    const {email,password} = req.body;
    try { 
        const user = await User.findOne({email});
        if(!user) 
            return res.status(400).json({message :"Invalid Email or Password"});
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch)
            return res.status(400).json({message:"Invalid email or Password"}) 
        res.json({userId: user._id , token:generateToken(user._id)});

    } catch{ 
        res.status(500).json({message:error.message})
    }
    
}; 

module.exports = { registerUser, loginUser };