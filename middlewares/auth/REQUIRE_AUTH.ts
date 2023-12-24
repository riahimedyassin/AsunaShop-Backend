import { Request, Response, NextFunction } from "express";
import Http from "../../lib/Http";
import { Token } from "../../utils/Token";

export const REQUIRE_AUTH = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
};
