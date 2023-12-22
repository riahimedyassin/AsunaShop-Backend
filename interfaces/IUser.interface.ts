import { Document } from "mongoose";

export interface IUser {
  IP: string;
  count: number;
  blocked: boolean;
}
export interface IUserModel extends Document, IUser {}
