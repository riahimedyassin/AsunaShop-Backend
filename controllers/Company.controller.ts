import { NextFunction, Request, Response } from "express";
import Company from "../models/Company.model";
import Http from "../lib/Http";
import AsyncWrapper  from "../decorators/AsyncWrapper";

export default class CompanyController {
  @AsyncWrapper
  public static async getAllCompanies(req: Request, res: Response, next: NextFunction) {
    const companies = await Company.find();
    if (companies)
      return Http.response(
        res,
        "Companies retrieved successfully",
        200,
        companies
      );
    return next(Http.error("Cannot retrieve companies", 500));
  }

  @AsyncWrapper
  public static async getCompany(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(Http.error("Please provide the Company ID", 400));
    const company = await Company.findById(id);
    if (company)
      return Http.response(
        res,
        "Company retrieved successfully",
        200,
        company
      );
    return next(Http.error("Cannot find the company", 404));
  }

  @AsyncWrapper
  public static async addCompany(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    const company = new Company(req.body);
    await company.validate();
    company.save();
    return Http.response(res, "Company added successfully", 201, company);
  }

  @AsyncWrapper
  public static async deleteCompany(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    if (!id) return next(Http.error("Please provide the Company ID", 400));
    const company = await Company.findById(id);
    if (!company) return Http.error("Cannot find company", 404);
    await company.deleteOne();
    return Http.response(res, "Company deleted successfully", 204);
  }

  @AsyncWrapper
  public static async updateCompany(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const changes = req.body;
    if (!id) return next(Http.error("Please provide the Company ID", 400));
    if (!changes) return next(Http.error("Please provide the changes", 400));
    const company = await Company.findOneAndUpdate({ _id: id }, changes, {
      new: true,
    });
    if (company)
      return Http.response(res, "Company updated successfully", 201, company);
    return next(Http.error("Cannot update company", 500));
  }
}
