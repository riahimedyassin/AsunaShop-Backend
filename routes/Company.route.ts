import express from "express";
import CompanyController from "../controllers/Company.controller";
const router = express.Router();

//PRIVATE Routes :

router.get("/", CompanyController.getAllCompanies);
router.post("/", CompanyController.addCompany);
router.get("/:id", CompanyController.getCompany);
router.patch("/:id", CompanyController.updateCompany);
router.delete("/:id", CompanyController.deleteCompany);

export { router };
