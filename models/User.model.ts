import mongoose, { Model, Schema } from "mongoose";
import { IUser, IUserModel } from "../interfaces/IUser.interface";

const userSchema = new Schema(
  {
    IP: {
      type: String,
      default: "0.0.0.0",
    },
    count: {
      type: String,
      default: 0,
    },
  }
);

const User: Model<IUserModel> = mongoose.model<IUserModel>("User", userSchema);

export default User;
