import { NextFunction, Request, Response } from "express";
import Order from "../models/Order.model";
import Http from "../lib/Http";

export default class OrderController {
  public static addOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const order = new Order(req.body);
      await order.validate();
      await order.save();
      return Http.response(res, "Order created successfully", 200, order);
    } catch (error: any) {
      return next(Http.error(error.message, 400));
    }
  };
  public static getOrders = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = (req as any).user;
    try {
      const orders = await Order.find({ client: user }).populate("products");
      if (orders)
        return Http.response(res, "Orders retrieved successfully", 200, orders);
      return next(Http.error("Cannot retrieve Orders", 500));
    } catch (error: any) {
      next(Http.error(error.message, 500));
    }
  };
  public static deleteOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { order } = req.params;
    try {
      const deleted = await Order.findOneAndDelete({ _id: order });
      if (deleted) return Http.response(res, "Order deleted successfully", 204);
      return next(Http.error("Cannot delete order", 500));
    } catch (error: any) {
      next(Http.error(error.message, 500));
    }
  };
  public static confirmOrder = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { order } = req.params;
    try {
      const confirmed = await Order.findByIdAndUpdate(
        { _id: order },
        { $set: { confirmed: true } },
        { new: true }
      );
      if (confirmed)
        return Http.response(
          res,
          "Order confirmed successfully",
          201,
          confirmed
        );
      return next(Http.error("Cannot confirm order", 500));
    } catch (error: any) {
      next(Http.error(error.message, 500));
    }
  };
}
