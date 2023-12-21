import mongoose, { Schema } from "mongoose";
import { addressSchema } from "./Address.model";
import { ICompany, ICompanyModel } from "../interfaces/ICompany.interface";

const companySchema = new Schema({
  name: {
    type: String,
    required: [true, "Please provide the companys name"],
  },
  owner: {
    type: String,
    required: [true, "Please provide the companys owner"],
  },
  partner: {
    type: Boolean,
    default: false,
  },
  address: {
    type: addressSchema,
    required: [true, "Please provide the companys address"],
  },
});

const Company = mongoose.model<ICompany, ICompanyModel>(
  "Company",
  companySchema
);
