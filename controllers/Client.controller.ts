import { NextFunction, Response, Request } from "express";
import Http from "../lib/Http";
import User from "../models/User.model";
import Client from "../models/Client.model";
import { Token } from "../utils/Token";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email) return next(Http.error("Please enter a valid email", 400));
    if (!password)
      return next(Http.error("Please enter a valid password", 400));
    const id = await Client.login(email, password);
    if (!id) return next(Http.error("Invalid Email or Password", 400));
    const token = Token.getToken(id);
    return Http.token(res, token);
  } catch (error) {
    next(Http.error("", 500));
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const client = new Client(req.body);
    const registered = await Client.register(client);
    if (registered)
      return Http.response(res, "Client registered successfully", 200, client);
    next(Http.error("Could not register Client", 500));
  } catch (error: any) {
    next(Http.error(error.message, 500));
  }
};
