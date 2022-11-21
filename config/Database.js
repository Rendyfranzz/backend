// import { Sequelize } from "sequelize-cockroachdb";
// import dotenv from "dotenv"
// dotenv.config()
// const db = new Sequelize(process.env.DATABASE_URL);
import { Sequelize } from "sequelize";
const db = new Sequelize('tests','root','',{
    host:"localhost",
    dialect:"mysql"
});

export default db;