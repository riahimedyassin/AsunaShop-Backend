import { NextFunction, Request, Response } from "express";
import Http from "../../lib/Http";
import User from "../../models/User.model";

export const REQUIRE_CLIENT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    if (!user) return next(Http.error("", 401));
    const exists = await User.exists({ _id: user });
    if (!exists) return next(Http.error("", 401));
    next();
  } catch (error) {
    next(Http.error("", 401));
  }
};
