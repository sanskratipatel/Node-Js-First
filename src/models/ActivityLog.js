const mongoose = require("mongoose");
const activityLogSchema =new mongoose.Schema({ 
    admin: { 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    action :{ 
        type:String,
        required:true,
        enum:["CREATE_USER","UPDATE_USER","DELETE_USER"]
    }, 
    targetUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
},{timestamps:true}); 

const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
module.exports = ActivityLog;