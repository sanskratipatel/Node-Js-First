const mongoose = require ("mongoose") ; 
const TodoSchema = new mongoose.Schema({ 
    title: { 
        type :String, 
        required:[true,"Provide title please"],
        
    },
    user:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{ 
        type:Boolean,
        enum:["PENDING","Completed"],
        default:"PENDING"
    },
    subtodos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubTodos",
        default:null
    }]


},{ timestamps: true });

const Todo = mongoose.model("Todo",TodoSchema);
module.exports =Todo