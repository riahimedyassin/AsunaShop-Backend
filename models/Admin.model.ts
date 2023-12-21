import mongoose, { Document, Model, Schema } from "mongoose";
import Client from "./Client.model";
import { IAdminModel } from "../interfaces/IAdmin.interface";


const adminSchema = new Schema({
    sup : {
        type : Boolean , 
        default : false 
    }
})

const Admin : Model<IAdminModel> = Client.discriminator<IAdminModel>('Admin',adminSchema)