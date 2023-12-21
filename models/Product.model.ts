import mongoose, { Schema } from "mongoose";
import { Categories } from "../enums/Categories.enum";
import { IProduct, IProductModel } from "../interfaces/IProduct.interface";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide the product name"],
  },
  quantity: {
    type: Number,
    required: [true, "Please provide the product quantity"],
  },
  category: {
    type: String,
    enum: Categories,
    required: [true, "Please provide the name of the category"],
  },
});

const Product = mongoose.model<IProduct, IProductModel>(
  "Product",
  productSchema
);

export default Product;
