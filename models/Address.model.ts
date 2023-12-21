import mongoose, { Schema } from "mongoose";
import { IAddress } from "../interfaces/IAddress.interface";

export const addressSchema = new Schema<IAddress>({
  country: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
});
