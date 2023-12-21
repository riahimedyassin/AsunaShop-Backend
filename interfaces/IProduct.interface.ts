import mongoose, { Document } from "mongoose";
import { Categories } from "../enums/Categories.enum";

export interface IProduct {
  name: string;
  quantity: number;
  category: Categories;
  owner: mongoose.Types.ObjectId;
}
export interface IProductModel extends Document {}
