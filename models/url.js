const mongoose=require("mongoose");
// Schema
const urlSchema= new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    redirectUrl:{
        type:String,
        required:true,
    },
   visitHistory:[{timstamp: {type: Number}}],
   createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users" //referring to the users model (users collection)
}
},
{timestamps:true}
);

// model

const URL= mongoose.model("url", urlSchema);

module.exports=URL;