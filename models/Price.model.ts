import mongoose, { Schema } from "mongoose";

export const priceSchema = new Schema({
  original: {
    type: Number,
    required: [true, "Please enter the original price"],
    min: [0.99, "Price can't be under 1DT"],
  },
  sale: {
    type: Number,
    required: [true, "Please enter the sale price"],
    min: [0.99, "Price can't be under 1DT"],
  },
});
