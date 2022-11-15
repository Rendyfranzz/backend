import { Transaction, Users } from "../models/userModel.js";

export const getTransaction = async(req,res)=>{
    try{
        const response =  await Transaction.findAll({
                include:[{
                    model:Users
                }]
            });
        res.status(200).json(response)
    }catch(error){
        res.status(500).json({msg:error.message})
    }
}
export const getTransactionById = async(req,res)=>{
    
    
}
export const createTransaction = async(req,res)=>{
    const {name,price,lunas} = req.body
    try{
        await Transaction.create({
            name:name,
            price:price,
            lunas:lunas,
            transid:req.userId,
            userUuid:req.userId
        });  
        res.status(201).json({msg:"Transaksi berhasil"})
    }catch(error){
        res.status(400).json({msg:error.message})
    }
}
export const updateTransaction = async(req,res)=>{
    
}
export const deleteTransaction = async(req,res)=>{
   
}