import Users from "../models/userModel.js";
import argon2 from "argon2"

export const Login = async(req, res)=>{
    console.log(typeof req.body.email)
    // const user = await Users.findOne({
    //     where:{
    //         email: req.body.email
    //     }
    // });
    // if(!user) return res.status(404).json({msg:"user tidak ditemukan"});
    // const match = await argon2.verify(user.password, req.body.password);
    // if(!match) return res.status(400).json({msg:"password salah"});
    // req.sessions.userId = user.uuid;
    // const uuid = user.uuid;
    // const name = user.name;
    // const email = user.email;
    // const role = user.role;
    // req.status(200).json("hai")
}

export const LogOut = (req, res)=>{
    req.sessions.destroy((err)=>{
        if(err) return res.status(400).json({msg:"Tidak dapat Log Out"});
        res.status(200).json({msg:"Anda telah log out"})
    })
}

export const Me = async(req, res)=>{
    if(!req.sessions.userId){
        return res.status.status(401).json({msg:"Mohon login ke akun anda"})
    }
    const user = await Users.findOne({
        attributes:["uuid","name","email","role"],
        where:{
            uuid: req.sessions.userId
        }
    });
    if(!user) return res.status(404).json({msg:"user tidak ditemukan"})
    res.status(200).json(user)
}