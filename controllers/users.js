const User=require("../models/users");
const {v4 :uuidv4 }=require("uuid");
const {setUser}=require("../services/auth");

async function handleUserSignUp(req,res){
    const{name,email,password}=req.body;

    await User.create({
        name,
        email,
        password
    })

    return res.render("home");
}

async function handleUserLogin(req,res){
    const{email,password}=req.body;
    const user=await User.findOne({email,password});
    if(!user){
       return res.render("login",{error:"Incorrect Username or password!"});
    }
       
    // const sessionId=uuidv4();//->used in case to stateful authetication
    //   const token= 
    //   setUser(sessionId,user);
        const token= setUser(user);
        res.cookie("token",token);
    // sending token for autherization through bearer token
        // return res.json({token});
       return res.redirect("/");
}

module.exports={
    handleUserSignUp,
    handleUserLogin
};