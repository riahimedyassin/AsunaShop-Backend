import mongoose, { Model, Schema } from "mongoose";
import { Categories } from "../enums/Categories.enum";
import { IProduct, IProductModel } from "../interfaces/IProduct.interface";

const productSchema = new Schema({
  picture: {
    type: String,
    required: false,
  },
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

const Product : Model<IProductModel> = mongoose.model<IProductModel>(
  "Product",
  productSchema
);

export default Product;
