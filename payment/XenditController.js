import Xendit from "xendit-node";
import dotenv from "dotenv"
import { Transaction} from "../models/UserModel.js";
dotenv.config()

export const getQr = async (req, res) => {
    const x = new Xendit({ secretKey: process.env.XENDIT_KEY });
    const { QrCode } = x;
    const qrcodeSpecificOptions = {};
    const q = new QrCode(qrcodeSpecificOptions);
    try {
        const response = await q.createCode({
            externalID: req.params.qrid,
            amount: req.params.amount,
            type: "DYNAMIC",
            callbackURL: 'https://5208-103-94-190-20.ap.ngrok.io/qrcall',
            metadata:null
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
    }

}

export const getCodeQr = async (req, res) => {
    const x = new Xendit({ secretKey: process.env.XENDIT_KEY });
    const { QrCode } = x;
    const qrcodeSpecificOptions = {};
    const q = new QrCode(qrcodeSpecificOptions);
    try {
        const response = await q.getCode({
            externalID: req.params.qrid
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
    }

}

export const qrCallback = async (req, res) => {
    // tiap callback langsung insert lunas
    // const reqToken = req.headers['x-callback-token']
    // if (reqToken == process.env.CALLBACK_TOKEN) {
            console.log(req.body);
            const response = await Transaction.findOne({
                where :{
                    qrId : req.body.qr_code.external_id
                }
            })
            if(response){
                await Transaction.update({
                    lunas:"lunas"
                },{
                    where:{
                        qrId : req.body.qr_code.external_id
                    }
                })}     
            return res.sendStatus(200)
       
    // }

}
