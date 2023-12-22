import express from "express";
import { addProductToCart, deleteProductFromCart, getCart } from "../controllers/Cart.controller";
import { REQUIRE_AUTH } from "../middlewares/auth/REQUIRE_AUTH";
const router = express.Router();

router.get("/", REQUIRE_AUTH, getCart);
router.post("/", REQUIRE_AUTH, addProductToCart);
router.delete("/", REQUIRE_AUTH, deleteProductFromCart);

export { router };
