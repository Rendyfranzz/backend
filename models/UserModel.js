import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

export const Users = db.define('users',{
    uuid:{
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true,
        validate:{
            notEmpty:true
        }
    },name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            isEmail:true
        }
    },password:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },role:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }
},{
    freezeTableName:true
})


export const Transaction = db.define('transaction',{
    transuuid:{
        type: DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true,
        validate:{
            notEmpty:true
        }
    },name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
            len:[3,100]
        }
    },price:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },lunas:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },transid:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    }
},{
    freezeTableName:true
})

Users.hasMany(Transaction)
Transaction.belongsTo(Users,{foreignKey:"transid"})