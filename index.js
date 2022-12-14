import express from "express";
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
import TimeRoute from "./route/TimeRoute.js"
const app = express();

// (async()=>[
//     await db.sync()
// ])();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
})
app.use(cors({
    credentials: true,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
    origin: "http://localhost:3000",
}));
// app.options("*",cors())
// const whitelist = ["http://localhost:3000"]
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error("Not allowed by CORS"))
//     }
//   },
//   credentials: true,
// }
// app.use(cors(corsOptions))
app.use(express.json())
// app.set("trust proxy",1);
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    // proxy:true,
    // httpOnly:false,
    cookie: {
        secure: false,
        // SameSite:"lax",
        // httpOnly:true
    }
}))




app.use(TransRoute)
app.use(AuthRoute)
app.use(UserRoute)
app.use(PaymentRoute)
app.use(TimeRoute)

// store.sync()
app.listen(process.env.PORT, () => {
    console.log("server running");
})