import { Sequelize } from "sequelize";

const db = new Sequelize('tests','root','',{
    host:"localhost",
    dialect:"mysql"
});

export default db;