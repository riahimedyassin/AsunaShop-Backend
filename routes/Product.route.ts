import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/Product.controller";
const router = express.Router();

// Public Routes :
// Filter

router.get("/", getAllProducts);
router.post("/", addProduct);

router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id", updateProduct);

//PRIVATE Routes :
//

export { router };
