import { NextFunction, Request, Response } from "express";
import AsyncWrapper from "../decorators/AsyncWrapper";
import Http from "../lib/Http";
import Admin from "../models/Admin.model";
import { Token } from "../utils/Token";
import { Crypt } from "../utils/Crypt";

export default class AdminController {
  @AsyncWrapper
  public static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email) return next(Http.error("Please provide your email", 400));
    if (!password) return next(Http.error("Please provide your password", 400));
    const id = await Admin.login(email, password);
    if (!id) return next(Http.error("Invalid email or password", 400));
    return Http.token(res, Token.getToken(id));
  }
  @AsyncWrapper
  public static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    if (!req.body) return next(Http.error("All fields are mandatory", 400));
    const admin = new Admin(req.body);
    if (await Admin.register(admin))
      return Http.response(res, "Admin created successfully", 201, admin);
    return next(Http.error("Could not create the admin", 500));
  }
  @AsyncWrapper
  public static async deleteAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const admin = (req as any).admin;
    const current = await Admin.findById(admin).select("sup");
    if (current && !current.sup) return next(Http.error("", 403));
    const { id } = req.params;
    await Admin.findOneAndDelete({ _id: id });
    return Http.response(res, "Admin deleted successfully", 204);
  }
  @AsyncWrapper
  public static async updateAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const current = (req as any).admin;
    const changes = req.body;
    if (!changes) return next(Http.error("Please provide any change", 400));
    if (changes["password"]) {
      changes["password"] = await Crypt.hash(changes["password"]);
    }
    const admin = id
      ? await Admin.update(id, changes)
      : await Admin.update(current, changes);
    return Http.response(res, "Admin profile updated successfully", 200, admin);
  }
}
