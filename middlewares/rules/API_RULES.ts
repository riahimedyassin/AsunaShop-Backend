import { Request, Response, NextFunction } from "express";

export const API_RULES = (req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Origin, X-Requested-With, Accept"
  );
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, PATCH, POST, GET, DELETE");
  };
  next();
};
