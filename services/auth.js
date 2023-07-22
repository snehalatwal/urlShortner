// // Create a hashmap->Required for statefull authentication
// const sessionIdToUser= new Map();

// // set/ write/map user to uuid/sessionId
// function setUser(id,user){
//     sessionIdToUser.set(id,user);
// }

// // function to get the sessionId
// function getUser(id){
//   return sessionIdToUser.get(id);
// }



/*Creating a stateless authentication using jwt(json web token) */

const jwt= require("jsonwebtoken");
const secret="SnehaThisIsASecretKey";

// setUser->This will generate token
function setUser(user){
  // const payload={
  //   _id: user._id,
  //   email:user.email
  // };
  
   return jwt.sign({
    _id:user._id,
    email:user.email,
    role:user.role
   },secret);//Sign the given payload into a web token
};

// verify the token which we get back from the front-end
function getUser(token){
  if(!token) return null;
  return jwt.verify(token,secret);
};

 module.exports={
      setUser,
      getUser
  
  };

