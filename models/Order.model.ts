import mongoose, { Schema } from "mongoose";
import { IOrder, IOrderModel } from "../interfaces/IOrder.interface";

const orderSchema = new Schema({
  products: {
    type: [mongoose.Types.ObjectId],
    ref: "Product",
    required: [true, "Please enter the list of products ID"],
  },
  client: {
    type: mongoose.Types.ObjectId,
    ref: "Client",
    required: [true, "Please enter the client's ID"],
  },
  archived: {
    type: Boolean,
    default: false,
  },
  confirmed : {
    type : Boolean , 
    default : false
  }
});
const Order = mongoose.model<IOrderModel>("Order", orderSchema);

export default Order;
