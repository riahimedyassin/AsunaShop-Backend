import mongoose, { Model, Schema } from "mongoose";
import { addressSchema } from "./Address.model";
import { IClient, IClientModel } from "../interfaces/IClient.interface";
import User from "./User.model";
import { Crypt } from "../utils/Crypt";

const clientSchema = new Schema<IClient>({
  firstName: {
    type: String,
    required: [true, "Please provide the user's first name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide the user's last name"],
  },
  email: {
    type: String,
    required: [true, "Please provide the user's last name"],
    unique: true,
    immutable : true
  },
  password: {
    type: String,
    required: [true, "Please provide the user's password"],
  },
  address: {
    type: addressSchema,
    required: [true, "Please provide the user's address"],
  },
  birthdate: {
    type: Date,
    required: [true, "Plese enter your birthdate"],
  },
});

clientSchema.statics.login = async function (email: string, password: string) {
  try {
    const client = await this.findOne(
      { email: email },
      { password: 1, email: 1, id: 1 }
    );
    if (!client) return null;
    return (await Crypt.compare(password, client.password)) ? client.id : null;
  } catch (error) {
    return null;
  }
};
clientSchema.statics.register = async function (client: IClient) {
  try {
    await client.validate();
    client.set("password", await Crypt.hash(client.password));
    const saved = await client.save();
    return saved != null;
  } catch (error) {
    throw error;
  }
};

const Client = User.discriminator<IClient, IClientModel>(
  "Client",
  clientSchema
);

export default Client;
