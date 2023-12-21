import express from "express";
import { addProduct, getAllProducts, getProduct } from "../controllers/Product.controller";
const router = express.Router(); 



// Public Routes : 
// GET ALL Products , Get Product  , Filter 

router.get('/',getAllProducts)
router.get("/:id",getProduct)
router.post('/',addProduct); 



//PRIVATE Routes : 
// Add Product , Delete Product , Update Product  

export {router}