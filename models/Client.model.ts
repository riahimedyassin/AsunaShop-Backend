import mongoose, { Schema } from "mongoose";
import { addressSchema } from "./Address.model";
import { IClient, IClientModel } from "../interfaces/IClient.interface";


const clientSchema = new Schema({
    firstName : {
        type : String , 
        required : [true,"Please provide the user's first name"]
    },
    lastName : {
        type : String , 
        required : [true,"Please provide the user's last name"]
    },
    email : {
        type : String , 
        required : [true,"Please provide the user's last name"],
        unique : true
    }, 
    password : {
        type : String , 
        required : [true, "Please provide the user's password"]
    },
    address : {
        type : addressSchema , 
        required : [true , "Please provide the user's address"]
    }
})

const Client = mongoose.model<IClient,IClientModel>('Client',clientSchema)

export default Client