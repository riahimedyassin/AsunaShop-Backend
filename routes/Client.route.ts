import express from "express";
import { login, register } from "../controllers/Client.controller";
const router = express.Router();

//PUBLIC Routes :
// Login , Register
router.post("/login", login);
router.post("/register", register);

//PRIVATE Routes :
// Get , Update , Delete

// Only Admin REQUIRED
// Get All Members

export { router };
