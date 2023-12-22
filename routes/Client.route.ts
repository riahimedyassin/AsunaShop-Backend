import express from "express";
import ClientController from "../controllers/Client.controller";
const router = express.Router();

//PUBLIC Routes :
router.post("/login", ClientController.login);
router.post("/register", ClientController.register);

//PRIVATE Routes :
//
router.get("/:id", ClientController.getClient);
router.delete("/", ClientController.deleteClient);
router.patch("/", ClientController.updateClient);

// Only Admin REQUIRED
// Get All Members
router.get("/", ClientController.getAllClients);

export { router };
