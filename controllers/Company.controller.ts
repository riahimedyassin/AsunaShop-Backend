import { NextFunction, Request, Response } from "express";
import Company from "../models/Company.model";
import Http from "../lib/Http";

export const getAllCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const companies = await Company.find();
    if (companies)
      return Http.response(
        res,
        "Companies retrieved successfully",
        200,
        companies
      );
    return Http.error("Cannot retrieve companies", 500);
  } catch (error: any) {
    next(Http.error(error.message, 500));
  }
};

export const getCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id) return next(Http.error("Please provide the Comapny ID", 400));
  try {
    const company = await Company.findById(id);
    if (company)
      return Http.response(
        res,
        "Companies retrieved successfully",
        200,
        company
      );
    return Http.error("Cannot retrieve company", 500);
  } catch (error: any) {
    next(Http.error(error.message, 500));
  }
};
export const addCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    const company = new Company(req.body);
    await company.validate();
    company.save();
    return Http.response(res, "Company added successfully", 201, company);
  } catch (error) {
    next(error);
  }
};
