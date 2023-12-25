import { IAddress } from "./IAddress.interface";
import { Document } from "mongoose";

export interface ICompany {
  name: string;
  owner: string;
  partner: boolean;
  address: IAddress;
}
export interface ICompanyModel extends ICompany,Document {}