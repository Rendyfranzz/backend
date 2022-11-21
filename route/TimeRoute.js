import express from "express"

import { createJadwal,getJadwal } from "../controllers/Time.js"

const router = express.Router();

router.post('/createjadwal',createJadwal)
router.get('/getjadwal',getJadwal)

export default router