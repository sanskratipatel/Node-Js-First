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
    description:{ 
        type:String, 
        default:null
    },
    status:{ 
        type:String,
        enum:["PENDING","Completed"],
        default:"PENDING"
    },
    subTodos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubTodo",
        default:[]
    }]


},{ timestamps: true });

const Todo = mongoose.model("Todo",TodoSchema);
module.exports =Todo