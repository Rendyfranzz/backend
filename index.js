import express from "express";
import bodyParser from "body-parser";
import cors from "cors"
import session from "express-session";
import dotenv from "dotenv"
import db from "./config/Database.js"
import SequelizeStore from "connect-session-sequelize"
dotenv.config()
import UserRoute from "./route/UserRoute.js"
import AuthRoute from "./route/AuthRoute.js"
import TransRoute from "./route/TransRoute.js"
import PaymentRoute from "./route/PaymentRoute.js"
const app = express();

// (async()=>[
//     await db.sync()
// ])();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
})


app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized:true,
    store: store,
    cookie:{
        secure:'auto'
    }
}))
app.use(cors({
    credentials: true,
    origin: "*"
}));
app.use(express.json())
app.use(TransRoute)
app.use(AuthRoute)
app.use(UserRoute)
app.use(PaymentRoute)

// store.sync()
app.listen(process.env.PORT,()=>{
    console.log("server running");
})