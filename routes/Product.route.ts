import express from "express";
import ProductController from "../controllers/Product.controller";
import Auth from "../middlewares/auth/Auth";
const router = express.Router();

// Public Routes :
// Filter
router.use(Auth.Valid);
router.get("/", Auth.Client, ProductController.getAllProducts);
router.get("/:id", Auth.Client, ProductController.getProduct);

router.use(Auth.Admin);
router.post("/", ProductController.addProduct);
router.delete("/:id", ProductController.deleteProduct);
router.patch("/:id", ProductController.updateProduct);


export { router };
