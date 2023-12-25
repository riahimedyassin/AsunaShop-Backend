import express from "express";
import UserController from "../controllers/User.controller";
import Auth from "../middlewares/auth/Auth";
const router = express.Router();

//PRIVATE Routes :
// filterByCountry  , BLOCK ACCESS

router.post("/", UserController.addUser);
router.post("/inc", UserController.incrementCount);
//PRIVATE ADMIN
router.use(Auth.Valid, Auth.Admin);
router.delete("/:id", UserController.deleteUser);
router.patch("/block/:id", UserController.blockAccess);
router.patch("/access/:id", UserController.retrieveAccess);
router.get("/", UserController.getAllUsers);

export { router };
