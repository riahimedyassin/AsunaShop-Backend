import bcrypt from "bcrypt";

export class Crypt {
  public static async hash(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }
  public static async compare(password: string, hashed: string) {
    return await bcrypt.compare(password, hashed);
  }
}
