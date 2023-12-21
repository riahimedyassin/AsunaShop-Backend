import { IAddress } from "./IAddress.interface";
import { IUser } from "./IUser.interface";
import { Document } from "mongoose";

export interface IClient extends IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  address: IAddress;
}

export interface IClientModel extends Document {}
