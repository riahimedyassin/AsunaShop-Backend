import mongoose, { Document, Model, Schema } from "mongoose";
import Client from "./Client.model";
import { IAdmin, IAdminModel } from "../interfaces/IAdmin.interface";
import { Crypt } from "../utils/Crypt";
import Http from "../lib/Http";

const adminSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please enter the admin's first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter the admin's last name"],
  },
  email: {
    type: String,
    required: [true, "Please enter the admin's email"],
  },
  password: {
    type: String,
    required: [true, "Please enter the admin's email"],
  },
  sup: {
    type: Boolean,
    default: false,
    imutable: true,
  },
});
adminSchema.statics.login = async function (email: string, password: string) {
  try {
    const admin = await this.findOne(
      { email: email },
      { email: 1, password: 1, id: 1 }
    );
    if (!admin) return null;
    return (await Crypt.compare(password, admin.password)) ? admin.id : null;
  } catch (error) {
    return null;
  }
};
adminSchema.statics.register = async function (admin: IAdmin) {
  await admin.validate();
  admin.set("password", await Crypt.hash(admin.get("password")));
  const saved = await admin.save();
  return saved != null;
};
adminSchema.statics.update = async function (id: string, changes: IAdmin) {
  const admin = await Admin.findByIdAndUpdate(id, changes, { new: true });
  if (!admin) throw Http.error("Cannot find this admin", 404);
  return admin;
};

const Admin = mongoose.model<IAdmin, IAdminModel>("Admin", adminSchema);

export default Admin;
