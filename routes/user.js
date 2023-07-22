const express=require("express");
const router=express.Router();
const {handleUserSignUp,
    handleUserLogin}=require("../controllers/users");

router.post('/signUp',handleUserSignUp);
router.post('/login',handleUserLogin);

module.exports=router;