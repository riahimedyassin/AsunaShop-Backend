import { NextFunction, Response, Request } from "express";
import User from "../models/User.model";
import Http from "../lib/Http";

export const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ip = req.headers["x-forwarded-for"];
    const user = new User({
      IP: ip,
    });
    await user.validate();
    await user.save();
    return Http.response(res, "User saved", 200, user);
  } catch (error: any) {
    next(Http.error(error.message, 400));
  }
};
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) return next(Http.error("Please provide the user id", 400));
    const user = await User.findByIdAndDelete({ _id: id });
    if (user) return Http.response(res, "User saved", 204);
    return next(Http.error("Cannot find the user", 500));
  } catch (error: any) {
    next(Http.error(error.message, 500));
  }
};
export const incrementCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ip = req.headers["x-forwarded-for"];
    const exist = await User.findOne({ IP: ip });
    if (exist) {
      exist.$inc("count");
      await exist.save();
      return Http.response(res, "User count updated", 200, exist);
    }
    return next(Http.error("Cannot find user with this IP Address", 404));
  } catch (error: any) {
    next(Http.error(error.message, 500));
  }
};
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    if (users)
      return Http.response(res, "Users retrieved successfully", 200, users);
    return next(Http.error("", 500));
  } catch (error: any) {
    next(Http.error(error.message, 500));
  }
};

export const blockAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ip = req.headers["x-forwarded-for"];
    const exist = await User.findOneAndUpdate(
      { IP: ip },
      { blocked: true },
      { new: true }
    );
    if (exist) return Http.response(res, "User has been blocked", 200, exist);
    return next(Http.error("Cannot find user with this IP Address", 404));
  } catch (error: any) {
    next(Http.error(error.message, 500));
  }
};
export const retrieveAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ip = req.headers["x-forwarded-for"];
    const exist = await User.findOneAndUpdate(
      { IP: ip },
      { blocked: false },
      { new: true }
    );
    if (exist) return Http.response(res, "User gained access", 200, exist);
    return next(Http.error("Cannot find user with this IP Address", 404));
  } catch (error: any) {
    next(Http.error(error.message, 500));
  }
};
export const exist = async (req: Request) => {
  try {
    const ip = req.headers["x-forwarded-for"];
    const exist = await User.findOne({ IP: ip });
    return exist != null;
  } catch (error) {
    return false;
  }
};
