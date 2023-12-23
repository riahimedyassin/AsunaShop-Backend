import express from "express";
import AdminController from "../controllers/Admin.controller";
const router = express.Router();

//PUBLIC Routes :
// Login
router.post("/login", AdminController.login);
router.post("/register", AdminController.register);

//PRIVATE Routes :
// Add admin , Add sup admin , Update , Delete

export {router}