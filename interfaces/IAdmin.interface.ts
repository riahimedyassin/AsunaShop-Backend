import { Document } from "mongoose";
import { IClient } from "./IClient.interface";

export interface IAdmin extends IClient {
    sup : boolean 
}
export interface IAdminModel extends Document {}