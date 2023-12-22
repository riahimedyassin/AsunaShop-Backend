import mongoose, { Document } from "mongoose";

export interface ICart {
  client: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
}

export interface ICartModel extends ICart,Document {}
