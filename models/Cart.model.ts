import mongoose, { Document, Schema } from "mongoose";
import { ICart, ICartModel } from "../interfaces/ICart.interface";

const cartSchema = new Schema({
  client: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide the owner of the cart"],
  },
  products: {
    type: [mongoose.Types.ObjectId],
    ref : 'Product', 
    default: [],
  },
});

const Cart = mongoose.model<ICart,ICartModel>('Cart',cartSchema)

export default Cart