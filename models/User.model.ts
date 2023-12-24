import mongoose, { Model, Schema } from "mongoose";
import { IUser, IUserModel } from "../interfaces/IUser.interface";

const userSchema = new Schema({
  IP: {
    type: String,
    default: "0.0.0.0",
    immutable : true 
  },
  count: {
    type: Number,
    default: 1,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});

const User: Model<IUserModel> = mongoose.model<IUserModel>("User", userSchema);

export default User;
