import express from "express";
import UserController from "../controllers/User.controller";
const router = express.Router();

//PRIVATE Routes :
// filterByCountry  , BLOCK ACCESS

router.get("/", UserController.getAllUsers);
router.post("/", UserController.addUser);
router.post("/inc", UserController.incrementCount);
router.delete("/:id", UserController.deleteUser);
router.patch("/block/:id", UserController.blockAccess);
router.patch("/access/:id", UserController.retrieveAccess);


export {router}