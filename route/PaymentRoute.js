import express from "express"

import { getVa,mandiriVa,getQr,qrCallback,mandiriCall,getMandiriVa } from "../payment/XenditController.js"

const router = express.Router();

router.get('/getva',getVa)
router.get('/getqr',getQr)
router.get('/getmandiri',getMandiriVa)
router.post('/mandiriva',mandiriVa)
router.post('/qrcall',qrCallback)
router.post('/mandiricall',mandiriCall)



export default router