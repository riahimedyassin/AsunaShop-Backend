import { NextFunction, Request, Response } from "express";
import { MongooseError } from "mongoose";
import Http from "../../lib/Http";
import { CustomError } from "../../lib/CustomError";
import { HTTP_ERROR } from "../../constants/ERROR";

export const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof MongooseError) {
    return Http.response(res, err.message, 400);
  }
  if (err instanceof CustomError) {
    switch (err.status) {
      case 400:
        Http.response(
          res,
          err.message != "" ? err.message : HTTP_ERROR[400],
          err.status
        );
        break;
      case 403:
        Http.response(
          res,
          err.message != "" ? err.message : HTTP_ERROR[403],
          err.status
        );
        break;
      case 429:
        Http.response(
          res,
          err.message != "" ? err.message : HTTP_ERROR[429],
          err.status
        );
        break;
      default:
        Http.response(
          res,
          err.message != "" ? err.message : HTTP_ERROR[500],
          err.status
        );
        break;
    }
  } else {
    if (err.message && (err.message as string).includes("validation failed")) {
      return Http.response(res, err.message, 400);
    }
    return Http.response(
      res,
      err.message != "" ? err.message : HTTP_ERROR[500],
      500
    );
  }
};
