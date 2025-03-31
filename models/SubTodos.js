const mongoose = require ("mongoose") ; 
const { applyTimestamps } = require("./User");

const SubTodoSchema = new mongoose.Schema({ 
    title: { 
        type:String ,
        required:true,                 
}, 
    notes:[{ 
        text:String,
        createdAt:{
            type:Date,
            default:Date.now
        }
    }],
    todo :{ 
        type:mongoose.Schema.Types.ObjectId, 
         ref : "Todo" ,
         required:true 
        } 
},{timestamps: true}); 

const SubTodo = mongoose.model("SubTodo",SubTodoSchema);
module.exports = SubTodo;