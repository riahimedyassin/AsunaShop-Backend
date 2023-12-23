import { NextFunction, Request, Response } from "express";
import AsyncWrapper from "../decorators/AsyncWrapper";
import Http from "../lib/Http";
import Admin from "../models/Admin.model";
import { Token } from "../utils/Token";

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
}
