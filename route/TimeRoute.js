import express from "express"

import { createJadwal,getJadwal,getJadwalId } from "../controllers/Time.js"

const router = express.Router();

router.post('/createjadwal',createJadwal)
router.get('/getjadwal/?:tanggal',getJadwal)
router.get('/getjadwalid/?:id',getJadwalId)

export default router