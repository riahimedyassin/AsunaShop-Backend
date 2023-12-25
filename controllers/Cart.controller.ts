import { NextFunction, Response, Request } from "express";
import Cart from "../models/Cart.model";
import Http from "../lib/Http";
import Product from "../models/Product.model";
import AsyncWrapper from "../decorators/AsyncWrapper";

export default class CartController {
  @AsyncWrapper
  private static async createCart(user: string) {
    const cart = new Cart({
      client: user,
      products: [],
    });
    await cart.save();
    return cart;
  }

  @AsyncWrapper
  public static async getCart(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;

    const cart = await Cart.findOne({ client: user });
    if (cart)
      return Http.response(
        res,
        "Cart retrieved successfully",
        200,
        await cart.populate("products")
      );

    const createdCart = await CartController.createCart(user);
    if (createdCart)
      return Http.response(
        res,
        "Cart retrieved successfully",
        200,
        createdCart
      );

    next(Http.error("Unable to retrieve cart", 500));
  }

  @AsyncWrapper
  public static async addProductToCart(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = (req as any).user;
    const { product } = req.body;

    if (!product) return next(Http.error("Please provide a product", 400));
    if (!(await Product.exists({ _id: product })))
      return next(Http.error("Product does not exist", 404));

    const cart =
      (await Cart.findOne({ client: user })) ||
      (await CartController.createCart(user));

    cart.updateOne({ $push: { products: product } });
    await cart.save();

    return Http.response(
      res,
      "Product added successfully",
      201,
      await cart.populate("products")
    );
  }

  @AsyncWrapper
  public static async deleteProductFromCart(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = (req as any).user;
    const { product } = req.body;

    const cart =
      (await Cart.findOne({ client: user })) ||
      (await CartController.createCart(user));

    await cart.updateOne({ $pull: { products: product } }, { new: true });
    await cart.save();

    return Http.response(
      res,
      "Product deleted successfully",
      200,
      await cart.populate("products")
    );
  }
}
