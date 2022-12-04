import { Jadwal, Transaction, Users } from "../models/UserModel.js";

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

export const getTransactionByUuid = async(req,res)=>{
    try{
        const response =  await Transaction.findAll({
                include:[{
                    model:Jadwal
                }],
                where:{
                    userid:req.params.id
                }
            });
        res.status(200).json(response)
    }catch(error){
        res.status(500).json({msg:error.message})
    }
}
export const getTransactionByQrid = async(req,res)=>{
    try{
        const response = await Transaction.findOne({
            where :{
                qrId : req.params.id,
            }
        })
        res.status(200).json(response)
    }catch(err){
        console.log(err);
    }
    
}
export const createTransaction = async(req,res)=>{
    const {name,price,lunas,tanggal,timeid,qrId,pesan} = req.body
    try{
        await Transaction.create({
            name:name,
            price:price,
            lunas:lunas,
            pesan:pesan,
            tanggal:tanggal,
            timeid:timeid,
            qrId:qrId,
            userid:req.userId,
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