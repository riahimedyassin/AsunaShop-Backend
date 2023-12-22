import mongoose, { Document, Model, Schema } from "mongoose";
import { ICart, ICartModel } from "../interfaces/ICart.interface";

const cartSchema = new Schema({
  client: {
    type: mongoose.Types.ObjectId,
    ref: "Client",
    required: [true, "Please provide the owner of the cart"],
  },
  products: {
    type: [mongoose.Types.ObjectId],
    ref : 'Product', 
    default: [],
  },
});

const Cart = mongoose.model<ICartModel>('Cart',cartSchema)

export default Cart