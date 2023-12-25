import express from "express";
import ClientController from "../controllers/Client.controller";
import Auth from "../middlewares/auth/Auth";
const router = express.Router();

//PUBLIC Routes :
router.post("/login", ClientController.login);
router.post("/register", ClientController.register);

//PRIVATE Routes :
//
router.use(Auth.Valid);
router.get("/me", Auth.Client, ClientController.getCurrentClient);
router.delete("/me", Auth.Client, ClientController.deleteCurrentClient);
router.patch("/me", Auth.Client, ClientController.updateCurrentClient);

// Only Admin REQUIRED
// Get All Members
router.use(Auth.Admin);
router.get("/", ClientController.getAllClients);
router.get("/:id", ClientController.getClient);
router.delete("/:id", ClientController.deleteClient);

export { router };
