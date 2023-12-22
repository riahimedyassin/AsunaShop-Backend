import express from "express";
import ProductController from "../controllers/Product.controller";
const router = express.Router();

// Public Routes :
// Filter

router.get("/", ProductController.getAllProducts);
router.post("/", ProductController.addProduct);

router.get("/:id", ProductController.getProduct);
router.delete("/:id", ProductController.deleteProduct);
router.patch("/:id", ProductController.updateProduct);

//PRIVATE Routes :
//

export { router };
