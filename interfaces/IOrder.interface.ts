import mongoose, { Document } from "mongoose";
import { IProduct, IProductModel } from "./IProduct.interface";

export interface IOrder {
  prdoucts: IProductModel[];
  client: mongoose.Types.ObjectId;
  archived: boolean;
  confirmed: boolean;
}

export interface IOrderModel extends IOrder,Document {}
