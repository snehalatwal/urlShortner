const {getUser}=require("../services/auth");

// this function is a soft check to login
function checkForAuthentication(req,res,next){
   // fetching the authorization value
   // const authorizationHeaderValue=req.headers["authorization"];
   const tokenCookie=req.cookies?.token;

   req.user=null;
   if(!tokenCookie) return next();


   // if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer")){
   //    return next();
   // }

   // passing it in the user and calling next() fun
   // const token=authorizationHeaderValue.split("Bearer")[1];
   const token=tokenCookie;
   const user=getUser(token);
   req.user =user;
   return next();
};

// this is to restrict user
function restrictTo(roles=[]){
   return function(req,res,next){
      if(!req.user) return res.redirect("/login");

      if(!roles.includes(req.user.role)) return res.end("UnAuthorized");
      return next();
   };
}
module.exports={
   checkForAuthentication,
   restrictTo
};