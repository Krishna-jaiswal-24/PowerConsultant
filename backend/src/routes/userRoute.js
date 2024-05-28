import express from "express";
import {createUser,loginUser,addDetails} from "../controllers/userController.js";

const router = express.Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.post('/add-details',addDetails )
export default router;