import express from "express";
import CartController from "../controllers/Cart.controller";
import { REQUIRE_AUTH } from "../middlewares/auth/REQUIRE_AUTH";
import { REQUIRE_CLIENT } from "../middlewares/auth/REQUIRE_CLIENT";
const router = express.Router();



router.use(REQUIRE_AUTH,REQUIRE_CLIENT); 
router.get("/", CartController.getCart);
router.post("/", CartController.addProductToCart);
router.delete("/", CartController.deleteProductFromCart);

export { router };
