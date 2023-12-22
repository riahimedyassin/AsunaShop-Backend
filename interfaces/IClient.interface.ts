import { IAddress } from "./IAddress.interface";
import { IUser } from "./IUser.interface";
import { Document, Model } from "mongoose";

export interface IClient extends IUser, Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  address: IAddress;
}

export interface IClientModel extends Model<IClient> {
  login(email: string, password: string): Promise<string | null>;
  register(client: IClient): Promise<IClient>;
}
