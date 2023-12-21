import { NextFunction, Request, Response } from "express";
import Product from "../models/Product.model";
import Http from "../lib/Http";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find();
    if (products)
      return Http.response(
        res,
        "Products Retrived Successfully",
        200,
        products
      );
    return Http.response(res, "Cannot retrieve products", 500);
  } catch (error: any) {
    next(Http.error(error.message, 500));
  }
};
export const getProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id) return next(Http.error("Please provide the product ID", 400));
  try {
    const product = await Product.findById(id);
    if (product)
      return Http.response(res, "Product retrived successfully", 200, product);
    return Http.error("Cannot find this products", 404);
  } catch (error: any) {
    next(Http.error(error.message, 500));
  }
};
export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = new Product(req.body);
    await product.validate(); 
    product.save();
    return Http.response(res, "Product added successfully", 201, product);
  } catch (error) {
    next(error);
  }
};
