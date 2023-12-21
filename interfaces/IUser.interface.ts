import { Document } from "mongoose";

export interface IUser {
  IP: string;
  count: number;
}
export interface IUserModel extends Document, IUser {}
