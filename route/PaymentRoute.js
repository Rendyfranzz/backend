import express from "express"

import { getQr,qrCallback,getCodeQr } from "../payment/XenditController.js"

const router = express.Router();

router.get('/getqr/?:qrid&&:amount',getQr)
router.get('/getcode/?:qrid',getCodeQr)
router.post('/qrcall',qrCallback)

export default router