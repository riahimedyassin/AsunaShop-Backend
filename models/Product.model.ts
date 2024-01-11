import mongoose, { Model, Schema } from "mongoose";
import { Categories } from "../enums/Categories.enum";
import { IProductModel } from "../interfaces/IProduct.interface";
import { priceSchema } from "./Price.model";

const productSchema = new Schema(
  {
    picture: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: [true, "Please provide the product name"],
    },
    descreption : {
      type: String , 
      required : [true,"Please enter the product's descreption"]
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
    company: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
      required: [true, "Please provide the producer of the product"],
    },
    price: {
      type: priceSchema,
      required: [true, "Please provide the product's price"],
    },
  },
  {
    timestamps: true,
  }
);

const Product: Model<IProductModel> = mongoose.model<IProductModel>(
  "Product",
  productSchema
);

export default Product;
