import { Response } from "express";
import { CustomError } from "./CustomError";

export default class Http {
  public static response(
    res: Response,
    message: string,
    status: number,
    data? : any
  ) {
    res.status(status).json({
      message,
      status,
      data: data,
    });
  }
  public static error(message: string, status: number) {
    throw new CustomError(message, status);
  }
}
