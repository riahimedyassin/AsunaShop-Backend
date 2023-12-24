import express from "express";
import AdminController from "../controllers/Admin.controller";
import { REQUIRE_AUTH } from "../middlewares/auth/REQUIRE_AUTH";
import { REQUIRE_ADMIN } from "../middlewares/auth/REQUIRE_ADMIN";
const router = express.Router();

//PUBLIC Routes :
// Login
router.post("/login", AdminController.login);
router.post("/register", AdminController.register);

//PRIVATE Routes :
// Add admin , Add sup admin , Update , Delete
router.use(REQUIRE_AUTH, REQUIRE_ADMIN);
router.get("/", AdminController.getAllAdmins);
router.get("/:id", AdminController.getAdmin);
router.delete("/:id", AdminController.deleteAdmin);
router.patch("/:id", AdminController.updateAdmin);

export { router };
