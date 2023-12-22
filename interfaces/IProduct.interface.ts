import mongoose, { Document } from "mongoose";
import { Categories } from "../enums/Categories.enum";
import { IPrice } from "./IPrice.interface";

export interface IProduct {
  name: string;
  quantity: number;
  category: Categories;
  company: mongoose.Types.ObjectId;
  price: IPrice;
  picture?: string;
}
export interface IProductModel extends Document {}
