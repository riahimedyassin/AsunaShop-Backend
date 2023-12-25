import express from "express";
import AdminController from "../controllers/Admin.controller";
import Auth from "../middlewares/auth/Auth";
const router = express.Router();

//PUBLIC Routes :
// Login
router.post("/login", AdminController.login);
router.post("/register", AdminController.register);

//PRIVATE Routes :
// Add admin , Add sup admin , Update , Delete
router.use(Auth.Valid, Auth.Admin);
router.get("/", AdminController.getAll);
router.get("/:id", AdminController.get);
router.delete("/:id", AdminController.delete);
router.patch("/:id", AdminController.update);

export { router };
