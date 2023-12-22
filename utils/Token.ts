import jwt from "jsonwebtoken";
import { SECRET_HASH_STRING } from "../server";

export class Token {
  public static getToken(id: string) {
    return jwt.sign({ id }, SECRET_HASH_STRING, { expiresIn: "1d" });
  }
  public static verifyToken(token: string) {
    return jwt.verify(token, SECRET_HASH_STRING);
  }
  public static decodeToken (token : string) {
    return jwt.decode(token); 
  }
}
