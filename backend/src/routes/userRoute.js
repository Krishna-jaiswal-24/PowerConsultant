import express from "express";
import {createUser,loginUser,addDetails} from "../controllers/userController.js";
import { getAttendanceDetails } from "../controllers/userControllers/getAttendanceDetails.js";

const router = express.Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.post('/attendance', addDetails);
router.get('/attendance/:userId', getAttendanceDetails);
export default router;