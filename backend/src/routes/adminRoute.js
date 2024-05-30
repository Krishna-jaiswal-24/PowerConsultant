import express from "express";
import {createAdmin,loginAdmin,uploadWages} from "../controllers/adminController.js";
import {getAllUsers} from "../controllers/userController.js";
const router=express.Router();

router.post("/create", createAdmin);
router.post("/login", loginAdmin);
router.get('/getAllUsers',getAllUsers);
router.post('/uploadWages',uploadWages)
export default router;