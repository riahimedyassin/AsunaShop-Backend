import express from "express";
import ClientController from "../controllers/Client.controller";
import { REQUIRE_ADMIN } from "../middlewares/auth/REQUIRE_ADMIN";
import { REQUIRE_AUTH } from "../middlewares/auth/REQUIRE_AUTH";
import { REQUIRE_CLIENT } from "../middlewares/auth/REQUIRE_CLIENT";
const router = express.Router();

//PUBLIC Routes :
router.post("/login", ClientController.login);
router.post("/register", ClientController.register);

//PRIVATE Routes :
//
router.use(REQUIRE_AUTH)
router.get("/me", REQUIRE_CLIENT, ClientController.getCurrentClient);
router.delete("/me", REQUIRE_CLIENT, ClientController.deleteCurrentClient);
router.patch("/me", REQUIRE_CLIENT, ClientController.updateCurrentClient);

// Only Admin REQUIRED
// Get All Members
router.use(REQUIRE_ADMIN)
router.get("/", ClientController.getAllClients);
router.get("/:id", ClientController.getClient);
router.delete("/:id", ClientController.deleteClient);

export { router };
