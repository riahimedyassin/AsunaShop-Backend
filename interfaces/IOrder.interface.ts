import mongoose, { Document } from "mongoose";

export interface IOrder {
  prdoucts: mongoose.Types.ObjectId[];
  client: mongoose.Types.ObjectId;
  archived: boolean;
  confirmed: boolean;
}

export interface IOrderModel extends Document {}
