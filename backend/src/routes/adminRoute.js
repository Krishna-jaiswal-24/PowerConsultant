import express from "express";
import {createAdmin,loginAdmin,uploadWages,getIndustriesAndCategories} from "../controllers/adminController.js";
import {getAllUsers} from "../controllers/userController.js";
import {deleteUser} from "../controllers/userControllers/deleteUser.js";
import {editUser} from "../controllers/userControllers/editUser.js";
import {search} from "../controllers/search.js";
import {addClient} from "../controllers/adminControllers/addClient.js";
import {allUsersAttendance} from "../controllers/userControllers/getAttendanceDetails.js";


const router=express.Router();

router.post("/create", createAdmin);
router.post("/login", loginAdmin);
router.get('/getAllUsers',getAllUsers);
router.post('/uploadWages',uploadWages)
router.delete('/delete/:id', deleteUser);
router.put('/editUser/:id', editUser);
router.post('/search', search);
router.get('/getIndustriesAndCategories', getIndustriesAndCategories);
router.post('/addClient', addClient);
router.get('/attendance',allUsersAttendance);
export default router;