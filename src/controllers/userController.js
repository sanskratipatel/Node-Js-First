const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");

const registerUser = async(req,res) =>{ 
    const {username,email,password} = req.body;
    try{  
        if (!password || typeof password !== "string") {
            return res.status(400).json({ message: "Password is required and must be a string" });
        }
        const userExists = await User.findOne({ email });

        if (userExists) 
            return res.status(400).json({message:"User Already exists"}); 

        const salt = await bcrypt.genSalt(10); // Generate salt 
        console.log("here it is ===", salt)

        const hashedPassword = await bcrypt.hash(password, salt);  
        console.log("hashed password =",hashedPassword)

        // // const user = await User.create({username, email, password : hashedPassword });  
        // console.log("username =",username) 
        // console.log("username password ==",email)

        const user = await User.create({ username, email, password }); 
        console.log("User = ",user)

        res.status(201).json({userId:user._id,token :generateToken (user._id)}) ; 
    } 
    catch (error){ 
          res.status(500).json({message:error.message});
    } 

};  


const loginUser = async (req,res) => { 
    const {email,password} = req.body;
    try { 
        const user = await User.findOne({email}); 
        console.log("user",user)
        if(!user) 
            return res.status(400).json({message :"Invalid Email or Password"}); 
        console.log("Entered password:", password);
        console.log("Stored hashed password:", user.password);
        const isMatch = await bcrypt.compare(password,user.password);
        console.log("ismatch===",isMatch)
        if(!isMatch)
            return res.status(400).json({message:"Invalid email or Password"}) 
        res.json({userId: user._id , token:generateToken(user._id)});

    } catch{ 
        res.status(500).json({ message: error.message }); 
    }
    
}; 


module.exports = { registerUser, loginUser }; 