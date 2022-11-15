import express from "express";
import {
     getTransaction,
     getTransactionById,
     createTransaction,
     updateTransaction,
     deleteTransaction
} from "../controllers/Transaction.js";

import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/transaction',verifyUser,adminOnly,getTransaction)
router.get('/transaction/:id',verifyUser,adminOnly,getTransactionById)
router.post('/transaction',verifyUser,createTransaction)
router.patch('/transaction/:id',verifyUser,adminOnly,updateTransaction)
router.delete('/transaction/:id',verifyUser,adminOnly,deleteTransaction)

export default router