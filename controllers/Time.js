
import { Jadwal, Transaction } from "../models/UserModel.js";

export const getJadwal = async(req,res)=>{
    try{
        const allJadwal = await Jadwal.findAll({
            attributes:['uuid','jam'],
            });

        const usedJadwal =  await Jadwal.findAll({
            attributes:['uuid','jam'],
                include:[{
                    model:Transaction,
                    where:{
                        lunas:"lunas"
                    }
                }]
            });

        const response = {
            all: allJadwal,
            used: usedJadwal
        }
            // {
            //     all: [{
            //         uuid: '',
            //         jam: '10.40'
            //     },{
            //         uuid: '',
            //         jam: '11.00'
            //     }],
            //     used: [{
            //         uuid: '',
            //         jam: '10.40'
            //     }]
            // }
        res.status(200).json(response)
    }catch(error){
        res.status(500).json({msg:error.message})
    }
}

export const getJadwalId = async(req,res)=>{
    
    
}
export const createJadwal = async(req,res)=>{
    const {jam} = req.body
    try{
        await Transaction.create({
            jam:jam,
            time:req.userId,
        });  
        res.status(201).json({msg:"Jam Dipilih"})
    }catch(error){
        res.status(400).json({msg:error.message})
    }
}
export const updateJadwal = async(req,res)=>{
    
}
export const deleteJadwal = async(req,res)=>{
   
}