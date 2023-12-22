import express from "express";
import {
  addCompany,
  deleteCompany,
  getAllCompanies,
  getCompany,
  updateCompany,
} from "../controllers/Company.controller";
const router = express.Router();

//PRIVATE Routes :

router.get("/", getAllCompanies);
router.post("/", addCompany);
router.get("/:id", getCompany);
router.patch("/:id", updateCompany);
router.delete("/:id", deleteCompany);

export { router };
