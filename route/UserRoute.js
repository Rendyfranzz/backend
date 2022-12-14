import express from "express";
import {
    getUserById,
    createUsers,
    updateUsers,
    deleteUsers,
    getUsers,
    getUsers2
} from "../controllers/Users.js"
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/users', verifyUser, adminOnly, getUsers)
router.get('/user', verifyUser, adminOnly, getUsers2)
router.get('/users/?:id', verifyUser, adminOnly, getUserById)
router.post('/users', createUsers)
router.patch('/users/?:id', verifyUser, adminOnly, updateUsers)
router.delete('/users/:id', verifyUser, adminOnly, deleteUsers)

export default router