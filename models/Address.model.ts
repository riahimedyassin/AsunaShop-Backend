import mongoose, { Schema } from "mongoose";
import { IAddress } from "../interfaces/IAddress.interface";

export const addressSchema = new Schema<IAddress>(
  {
    country: {
      type: String,
      required: [true, "Please provide the country"],
    },
    region: {
      type: String,
      required: [true, "Please provide the region"],
    },
    city: {
      type: String,
      required: [true, "Please provide the city"],
    },
    street: {
      type: String,
      required: [true, "Please provide the street"],
    },
  },
  { _id: false }
);
