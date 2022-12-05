import {Users} from "../models/UserModel.js";
import argon2 from "argon2"

export const Login = async(req, res)=>{
    const user = await Users.findOne({
        where:{
            email: req.body.email
        }
    });
    if(!user) return res.status(404).json({msg:"user tidak ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg:"password salah"});
    
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    req.session.user = req.body.email;
    res.send('cookie2',user.uuid,{sameSite:"none",secure:true})
    res.status(200).json({uuid,name,email,role})
    
}

export const LogOut = (req, res)=>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg:"Tidak dapat Log Out"});
        res.status(200).json({msg:"Anda telah log out"})
    })
}

export const Me = async(req, res)=>{
    
    console.log(req.session.user);
    // if(!req.session.user){
    //     return res.status(401).json({msg:"Mohon login ke akun anda"})
    // }
    // const user = await Users.findOne({
    //     attributes:["uuid","name","email","role","hp"],
    //     where:{
    //         uuid: req.session.user
    //     }
    // });
    // if(!user) return res.status(404).json({msg:"user tidak ditemukan"})
    // res.status(200).json(user)
}