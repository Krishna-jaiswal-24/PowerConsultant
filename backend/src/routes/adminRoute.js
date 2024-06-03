import express from "express";
import {createAdmin,loginAdmin,uploadWages} from "../controllers/adminController.js";
import {getAllUsers} from "../controllers/userController.js";
import {deleteUser} from "../controllers/userControllers/deleteUser.js";
import {editUser} from "../controllers/userControllers/editUser.js";

const router=express.Router();

router.post("/create", createAdmin);
router.post("/login", loginAdmin);
router.get('/getAllUsers',getAllUsers);
router.post('/uploadWages',uploadWages)
router.delete('/delete/:id', deleteUser);
router.put('/editUser/:id', editUser);
export default router;