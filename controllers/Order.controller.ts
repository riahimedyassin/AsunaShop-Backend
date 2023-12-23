import { NextFunction, Request, Response } from "express";
import Order from "../models/Order.model";
import Http from "../lib/Http";
import  AsyncWrapper  from "../decorators/AsyncWrapper";

export default class OrderController {
  @AsyncWrapper
  public static async addOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const order = new Order(req.body);
    await order.validate();
    await order.save();
    return Http.response(res, "Order created successfully", 200, order);
  }

  @AsyncWrapper
  public static async getOrders(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = (req as any).user;
    const orders = await Order.find({ client: user }).populate("products");
    if (orders)
      return Http.response(res, "Orders retrieved successfully", 200, orders);
    return next(Http.error("Cannot retrieve Orders", 500));
  }

  @AsyncWrapper
  public static async deleteOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { order } = req.params;
    const deleted = await Order.findOneAndDelete({ _id: order });
    if (deleted) return Http.response(res, "Order deleted successfully", 204);
    return next(Http.error("Cannot delete order", 500));
  }

  @AsyncWrapper
  public static async confirmOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { order } = req.params;
    const confirmed = await Order.findByIdAndUpdate(
      { _id: order },
      { $set: { confirmed: true } },
      { new: true }
    );
    if (confirmed)
      return Http.response(res, "Order confirmed successfully", 201, confirmed);
    return next(Http.error("Cannot confirm order", 500));
  }
}
