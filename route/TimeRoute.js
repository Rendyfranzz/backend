import express from "express"

import { createJadwal, deleteJadwal, getAllJadwal, getJadwal, getJadwalId } from "../controllers/Time.js"
import { adminOnly, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.post('/createjadwal', verifyUser, adminOnly, createJadwal)
router.get('/getalljadwal', getAllJadwal)
router.get('/getjadwal/?:tanggal', getJadwal)
router.get('/getjadwalid/?:id', getJadwalId)
router.delete('/jadwal/?:id', verifyUser, adminOnly, deleteJadwal)

export default router