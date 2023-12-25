import express from "express";
import CartController from "../controllers/Cart.controller";
import Auth from "../middlewares/auth/Auth";
const router = express.Router();

router.use(Auth.Valid, Auth.Client);
router.get("/", CartController.getCart);
router.post("/", CartController.addProductToCart);
router.delete("/", CartController.deleteProductFromCart);

export { router };
