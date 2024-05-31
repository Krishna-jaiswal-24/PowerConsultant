import express from "express";
import {createUser,loginUser,addDetails} from "../controllers/userController.js";

const router = express.Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.post('/attendance', addDetails);

export default router;