const mongoose=require("mongoose");

// Schema
const userSchema = new mongoose.Schema({
    name:{
        type :String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        required:true,
        default:"NORMAL"
    },
    password:{
        type:String,
        required:true
    }
},

{timestamp:true}

);

// model

const User=mongoose.model("user",userSchema);

// export
module.exports=User;