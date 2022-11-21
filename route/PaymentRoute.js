import express from "express"

import { getVa,mandiriVa,getQr,qrCallback,mandiriCall,getMandiriVa,getCodeQr } from "../payment/XenditController.js"

const router = express.Router();

router.get('/getva',getVa)
router.get('/getqr',getQr)
router.get('/getcode',getCodeQr)
router.get('/getmandiri',getMandiriVa)
router.post('/mandiriva',mandiriVa)
router.post('/qrcall',qrCallback)
router.post('/mandiricall',mandiriCall)



export default router