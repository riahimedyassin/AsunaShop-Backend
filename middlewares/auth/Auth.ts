import { Request, Response, NextFunction } from "express";
import Http from "../../lib/Http";
import Admin from "../../models/Admin.model";
import { Token } from "../../utils/Token";
import User from "../../models/User.model";

export default class Auth {
  public static async Admin(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      if (!user) return next(Http.error("", 401));
      const exist = await Admin.findById(user);
      if (!exist) return next(Http.error("", 401));
      (req as any).admin = user;
      (req as any).isSup = exist.sup;
      next();
    } catch (error) {
      return next(Http.error("", 401));
    }
  }
  public static async Valid(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    const condition =
      authorization &&
      authorization.includes("Bearer") &&
      authorization.split(" ").length === 2;
    if (!condition) return next(Http.error("", 401));
    try {
      const { id } = Token.verifyToken(authorization.split(" ")[1]);
      if (!id) return next(Http.error("", 401));
      (req as any).user = id;
      return next();
    } catch (error) {
      return next(Http.error("", 401));
    }
  }
  public static async Client(req: Request, res: Response, next: NextFunction) {
    try {
      const user = (req as any).user;
      if (!user) return next(Http.error("", 401));
      const exists = await User.exists({ _id: user });
      if (!exists) return next(Http.error("", 401));
      next();
    } catch (error) {
      next(Http.error("", 401));
    }
  }
}
