import express from "express";
import {
  deleteClient,
  getAllClients,
  getClient,
  login,
  register,
  updateClient,
} from "../controllers/Client.controller";
const router = express.Router();

//PUBLIC Routes :
router.post("/login", login);
router.post("/register", register);

//PRIVATE Routes :
//
router.get("/:id", getClient);
router.delete("/", deleteClient);
router.patch("/", updateClient);

// Only Admin REQUIRED
// Get All Members
router.get("/", getAllClients);

export { router };
