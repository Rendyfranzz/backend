import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import session from "express-session";
import dotenv from "dotenv"
// import db from "./config/Database.js"
dotenv.config()
import UserRoute from "./route/UserRoute.js"
import AuthRoute from "./route/AuthRoute.js"
const app = express();

// (async()=>[
//     await db.sync()
// ])();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized:true,
    cookie:{
        secure:'auto'
    }
}))
app.use(cors({
    credentials: true,
    origin: "http:/localhost:300"
}));
app.use(express.json())
app.use(AuthRoute)
app.use(UserRoute)
app.listen(process.env.APP_PORT,()=>{
    console.log("server running");
})