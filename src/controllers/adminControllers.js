const User =require("../models/User");
const bcrypt =require("bcryptjs");

const getUsers =async(req ,res) =>{ 
    try{ 
        const users =await User.find().select("-password"); 
        res.json(users);
    }catch(error) { 
        res.status(500).json({message: error.message});

    }
};  


const getUserById = async(req,res) =>{ 
    try{ 
        const user= await user.findById(req.params.id).select("-password"); 
        if(!user) return res.status(404).json({message: "User not Found"});
        res.json(user);
    } catch(error){ 
        res.status(500).json({message:error.message});
    }
} 

const createUser =async(req,res) => { 
    try { 
        const {  name,email,password,role,status }=req.body;
        if (role === "admin" && req.user.role !== "admin") {
            return res.status(403).json({ message: "Only admins can create admins" });
          }
        const existingUser = await User.findOne({email}) ;
        if(existingUser) return res.status(400).json({message: "User Already exists"});
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({name,email,password:hashedPassword,role,status });
        await newUser.save();
        res.status(201).json({message: "User Created Successfully", user:newUser}) ;
    } 
    catch(error){ 
            res.status(500).json({message:error.message});
    }
};  

const updateUser = async (req, res) => {
    try {
      const { name, email, password, role, status } = req.body;
      const user = await User.findById(req.params.id);
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 10);
      if (role) user.role = role;
      if (status) user.status = status;
  
      await user.save();
      res.json({ message: "User updated successfully", user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Delete user (Admin only)
  const deleteUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      await user.deleteOne();
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
  