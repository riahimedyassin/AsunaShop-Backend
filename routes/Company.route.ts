import express from "express";
import { addCompany, getAllCompanies, getCompany } from "../controllers/Company.controller";
const router = express.Router(); 



//PRIVATE Routes : 
// Add Company , Delete Company , Update Company ,   GET ALL Companies , Get Company

router.get('/',getAllCompanies)
router.get('/:id',getCompany)
router.post('/',addCompany)

export {router}