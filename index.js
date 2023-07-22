const express= require("express");
const app=express();
const path=require("path");
const {connectMongoDb}=require("./connection");
const urlRoute=require("./routes/url");
const staticRoute=require("./routes/staticRoute");
const userRoute=require("./routes/user");
const {checkForAuthentication,
    restrictTo}=require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const PORT=8000;

// connect db
connectMongoDb()
.then(()=>console.log("Mongo DB is connected!"))
.catch((err)=>console.log(err));

// set view engine to ejs
app.set("view engine", "ejs");
app.set("veiws", path.resolve("./views"));

// middleware
app.use(express.json());
app.use(express.urlencoded ({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication);

// routes
app.use('/api/url',restrictTo(["NORMAL"]),urlRoute);//restrictToLoggedInUserOnly,
app.use('/',staticRoute);//checkAuth,
app.use('/user',userRoute);


app.listen(PORT, ()=>console.log(`Server started at PORT:${PORT}`));