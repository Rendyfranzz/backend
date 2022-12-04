import express from "express";
import {
     getTransaction,
     getTransactionByQrid,
     createTransaction,
     updateTransaction,
     deleteTransaction,
     getTransactionByUuid
} from "../controllers/Transaction.js";

import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/transaction',verifyUser,adminOnly,getTransaction)
router.get('/transaction/?:id',verifyUser,getTransactionByQrid)
router.get('/usertrans/?:id',verifyUser,getTransactionByUuid)
router.post('/transaction',verifyUser,createTransaction)
router.patch('/transaction/:id',verifyUser,adminOnly,updateTransaction)
router.delete('/transaction/:id',verifyUser,adminOnly,deleteTransaction)

export default router