import express from "express";
const router = express.Router(); 
import OrderController from "../controllers/Order.controller";

router.get('/',OrderController.getOrders)
router.post('/',OrderController.addOrder)
router.delete('/.:id',OrderController.deleteOrder)
router.post('/:id',OrderController.confirmOrder)

//PRIVATE Routes : 
// Update , Delete , Add Order , Confirm , Get

export {router}