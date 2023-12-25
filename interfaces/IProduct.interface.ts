import mongoose, { Document } from "mongoose";
import { Categories } from "../enums/Categories.enum";
import { IPrice } from "./IPrice.interface";
import { ICompany, ICompanyModel } from "./ICompany.interface";

export interface IProduct {
  name: string;
  quantity: number;
  category: Categories;
  company: ICompanyModel;
  price: IPrice;
  picture?: string;
}
export interface IProductModel extends IProduct,Document {
  
}
