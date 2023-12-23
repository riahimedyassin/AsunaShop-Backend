import { Document, Model } from "mongoose";

export interface IAdmin extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  sup: boolean;
}
export interface IAdminModel extends Model<IAdmin> {
  login(email: string, password: string): Promise<string | null>;
  register(admin: IAdmin): Promise<IAdmin>;
}
