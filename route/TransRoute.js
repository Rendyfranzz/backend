import express from "express";
import {
     getTransaction,
     createTransaction,
     deleteTransaction,
     getTransactionByUuid,
     getStatusTransaction,
     updateStatus,
     getTransactionByid
} from "../controllers/Transaction.js";

import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/transaction', verifyUser, adminOnly, getTransaction)
router.get('/transaction/?:id', verifyUser, getTransactionByid)
router.get('/usertrans/?:id', verifyUser, getTransactionByUuid)
router.get('/getstatus/', verifyUser, getStatusTransaction)
router.post('/transaction', verifyUser, createTransaction)
router.patch('/transaction/:id', verifyUser, adminOnly, updateStatus)
router.delete('/deltrans/:id', verifyUser, adminOnly, deleteTransaction)

export default router