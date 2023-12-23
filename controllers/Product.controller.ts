import { NextFunction, Request, Response } from "express";
import Product from "../models/Product.model";
import Http from "../lib/Http";
import { IProductModel } from "../interfaces/IProduct.interface";
import Company from "../models/Company.model";
import { ErrorHandler } from "../decorators/ErrorHandler";

export default class ProductController {
  @ErrorHandler
  public static async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const products = await Product.find().populate("company");
    if (products)
      return Http.response(
        res,
        "Products Retrived Successfully",
        200,
        products
      );
    return Http.response(res, "Cannot retrieve products", 500);
  }
  @ErrorHandler
  public static async getProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    if (!id) return next(Http.error("Please provide the product ID", 400));

    const product = await Product.findById(id).populate("company", {
      __v: 0,
    });
    if (product)
      return Http.response(res, "Product retrived successfully", 200, product);
    return Http.error("Cannot find this products", 404);
  }
  @ErrorHandler
  public static async addProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const product = new Product(req.body);
    await product.validate();
    const company = product.get("company");
    if (!company || !(await Company.exists({ _id: company })))
      return next(Http.error("Please provide a valid company ID", 400));
    product.save();
    return Http.response(res, "Product added successfully", 201, product);
  }
  @ErrorHandler
  public static async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const changes = req.body;
    if (!id) return next(Http.error("Please provide the Product ID", 400));
    if (!changes) return next(Http.error("Please provide the changes", 400));
    const product = await Product.findOneAndUpdate({ _id: id }, changes, {
      new: true,
    }).populate("company");
    if (product)
      return Http.response(res, "Product updated successfully", 201, product);
    return next(Http.error("Cannot update Product", 500));
  }
  @ErrorHandler
  public static async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    if (!id) return next(Http.error("Please provide the Product ID", 400));
    const product = await Product.findById(id);
    if (!product) return Http.error("Cannot find Product", 404);
    await product.deleteOne();
    return Http.response(res, "Product deleted successfully", 204);
  }
  public static getFilters(req: Request) {
    const { company, price, category } = req.query;
    const final = [{ company }, { price }, { category }].filter((key) => {
      return Object.values(key)[0] != undefined;
    });
    return final;
  }
}
