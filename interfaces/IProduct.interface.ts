import mongoose, { Document } from "mongoose";
import { Categories } from "../enums/Categories.enum";

export interface IProduct {
  picture?: string;
  name: string;
  quantity: number;
  category: Categories;
  company: mongoose.Types.ObjectId;
}
export interface IProductModel extends Document {}
