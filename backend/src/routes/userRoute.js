import express from "express";
import {addDetails, createUser, loginUser} from "../controllers/userController.js";
import {getAttendanceDetails} from "../controllers/userControllers/getAttendanceDetails.js";
import {deleteAttendance} from "../controllers/userControllers/deleteAttendance.js";
import {editAttendance} from "../controllers/userControllers/editAttendance.js";
import {forgotPassword} from "../controllers/userControllers/forgotPassword.js";


const router = express.Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.post('/attendance', addDetails);
router.get('/attendance/:userId', getAttendanceDetails);
router.delete('/attendance/:id', deleteAttendance);
router.put('/attendance/:id', editAttendance);
router.post('/forgot-password', forgotPassword);
export default router;