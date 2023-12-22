import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_HASH_STRING } from "../server";

export class Token {
  public static getToken(id: string) {
    return jwt.sign({ id }, SECRET_HASH_STRING, { expiresIn: "1d" });
  }
  public static verifyToken(token: string) : JwtPayload {
    return <JwtPayload>jwt.verify(token, SECRET_HASH_STRING);
  }
  public static decodeToken (token : string) {
    return jwt.decode(token); 
  }
}
