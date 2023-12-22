import { NextFunction, Response, Request } from "express";
import Cart from "../models/Cart.model";
import Http from "../lib/Http";
import Product from "../models/Product.model";

export default class CartController {
  public static createCart = async (user: string) => {
    try {
      const cart = new Cart({
        client: user,
        products: [],
      });
      await cart.save();
      return cart;
    } catch (error) {
      throw error;
    }
  };
  public static getCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = (req as any).user;
    try {
      const cart = await Cart.findOne({ client: user });
      if (cart)
        return Http.response(
          res,
          "Cart retrieved successfully",
          200,
          await cart.populate("products")
        );
      const createdCart = await this.createCart(user);
      if (createdCart)
        return Http.response(
          res,
          "Cart retrieved successfully",
          200,
          createdCart
        );
    } catch (error: any) {
      return next(Http.error(error.message, 500));
    }
  };
  public static addProductToCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = (req as any).user;
    const { product } = req.body;
    if (!product) return next(Http.error("Please provide a product", 400));
    if (!(await Product.exists({ _id: product })))
      return next(Http.error("Product does not exist", 404));
    try {
      const cart =
        (await Cart.findOne({ client: user })) || (await this.createCart(user));
      cart.updateOne({ $push: { products: product } });
      await cart.save();
      return Http.response(
        res,
        "Product added successfully",
        201,
        await cart.populate("products")
      );
    } catch (error: any) {
      return next(Http.error(error.message, 500));
    }
  };
  public static deleteProductFromCart = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const user = (req as any).user;
    const { product } = req.body;
    try {
      const cart =
        (await Cart.findOne({ client: user })) || (await this.createCart(user));
      await cart.updateOne({ $pull: { products: product } }, { new: true });
      await cart.save();
      return Http.response(
        res,
        "Product deleted successfully",
        200,
        await cart.populate("products")
      );
    } catch (error: any) {
      return next(Http.error(error.message, 500));
    }
  };
}
