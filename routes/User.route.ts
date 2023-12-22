import express from "express";
import {
  addUser,
  blockAccess,
  deleteUser,
  getAllUsers,
  incrementCount,
  retrieveAccess,
} from "../controllers/User.controller";
const router = express.Router();

//PRIVATE Routes :
// filterByCountry  , BLOCK ACCESS

router.get("/", getAllUsers);
router.post("/", addUser);
router.post("/inc", incrementCount);
router.delete("/:id", deleteUser);
router.patch("/block/:id", blockAccess);
router.patch("/access/:id", retrieveAccess);


export {router}