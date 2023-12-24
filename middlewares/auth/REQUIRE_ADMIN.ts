import { NextFunction, Request, Response } from "express";
import Http from "../../lib/Http";
import Admin from "../../models/Admin.model";

export const REQUIRE_ADMIN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};
