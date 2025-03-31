const mongoose = require ("mongoose");
const bcrypt = require("bcryptjs"); 

const UserSchema = new mongoose.Schema({ 
    username:{ 
        type:String, 
        unique:true,
        required:[true, "Enter username"]
    } ,
    email :{ 
        type:String,
        unique:true,
        required:[true,"Enter Email please"]
    } ,
    password :{
        type:String, 
        required:[true, "Enter password"],
        minlength: 6

    },
    todos: [{ 
        type:mongoose.Schema.Types.ObjectId,
        ref :"Todo"
    }],
},{ timestamps: true });


UserSchema.pre("save", async function(next) { 
    if (!this.isModified("password")) return next();
    try { 
        const salt = await bcrypt.genSalt(10);  
        this.password = await bcrypt.hash(this.password,salt);
        next();
    }
    catch(err){ 
        next(err);
    }
}); 
const User = mongoose.model("User",UserSchema)
module.exports =User;
