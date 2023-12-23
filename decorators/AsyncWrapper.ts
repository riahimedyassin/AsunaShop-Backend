import { NextFunction, Response, Request } from "express";
import Http from "../lib/Http";

export default function AsyncWrapper(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await originalMethod.call(this, req, res, next);
    } catch (error: any) {
      next(error);
    }
  };
  return descriptor;
}
