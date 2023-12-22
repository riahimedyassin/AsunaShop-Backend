import express from "express";
import CartController from "../controllers/Cart.controller";
import { REQUIRE_AUTH } from "../middlewares/auth/REQUIRE_AUTH";
const router = express.Router();

router.get("/", REQUIRE_AUTH, CartController.getCart);
router.post("/", REQUIRE_AUTH, CartController.addProductToCart);
router.delete("/", REQUIRE_AUTH, CartController.deleteProductFromCart);

export { router };
