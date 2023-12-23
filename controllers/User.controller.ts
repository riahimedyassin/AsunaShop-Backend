import { NextFunction, Response, Request } from "express";
import User from "../models/User.model";
import Http from "../lib/Http";
import  AsyncWrapper  from "../decorators/AsyncWrapper";

export default class UserController {
  @AsyncWrapper
  public static async addUser(req: Request, res: Response, next: NextFunction) {
    const ip = req.headers["x-forwarded-for"];
    const user = new User({
      IP: ip,
    });
    await user.validate();
    await user.save();
    return Http.response(res, "User saved", 200, user);
  }

  @AsyncWrapper
  public static async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(Http.error("Please provide the user id", 400));
    const user = await User.findByIdAndDelete({ _id: id });
    if (user) return Http.response(res, "User saved", 204);
    return next(Http.error("Cannot find the user", 500));
  }

  @AsyncWrapper
  public static async incrementCount(req: Request, res: Response, next: NextFunction) {
    const ip = req.headers["x-forwarded-for"];
    const exist = await User.findOne({ IP: ip });
    if (exist) {
      exist.$inc("count");
      await exist.save();
      return Http.response(res, "User count updated", 200, exist);
    }
    return next(Http.error("Cannot find user with this IP Address", 404));
  }

  @AsyncWrapper
  public static async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const users = await User.find();
    if (users)
      return Http.response(res, "Users retrieved successfully", 200, users);
    return next(Http.error("", 500));
  }

  @AsyncWrapper
  public static async blockAccess(req: Request, res: Response, next: NextFunction) {
    const ip = req.headers["x-forwarded-for"];
    const exist = await User.findOneAndUpdate(
      { IP: ip },
      { blocked: true },
      { new: true }
    );
    if (exist) return Http.response(res, "User has been blocked", 200, exist);
    return next(Http.error("Cannot find user with this IP Address", 404));
  }

  @AsyncWrapper
  public static async retrieveAccess(req: Request, res: Response, next: NextFunction) {
    const ip = req.headers["x-forwarded-for"];
    const exist = await User.findOneAndUpdate(
      { IP: ip },
      { blocked: false },
      { new: true }
    );
    if (exist) return Http.response(res, "User gained access", 200, exist);
    return next(Http.error("Cannot find user with this IP Address", 404));
  }

  @AsyncWrapper
  public static async exist(req: Request) {
    const ip = req.headers["x-forwarded-for"];
    const exist = await User.findOne({ IP: ip });
    return exist != null;
  }
}
