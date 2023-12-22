import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/connect";
import { router as ProductRoute } from "./routes/Product.route";
import { router as CompanyRoute } from "./routes/Company.route";
import { ErrorHandler } from "./error/handler/ErrorHandler";
import cors from "cors";
import { API_RULES } from "./middlewares/rules/API_RULES";
import { BASE_URL } from "./constants/GENERAL";

const app = express();

/*
  CONFIG
*/
dotenv.config();
cors({
  origin: "*",
});

/*
    API RULES
*/
app.use(API_RULES);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*
    ROUTES
*/

app.use(`${BASE_URL}/products`, ProductRoute);
app.use(`${BASE_URL}/companies`, CompanyRoute);
app.use(ErrorHandler);

/*
  ENV
*/
const PORT = process.env.PORT || 3000;
const CONENCTION_STRING = process.env.CONNECTION_STRING;

/*
    RUN
*/

const start = async () => {
  try {
    if (
      typeof CONENCTION_STRING == "string" &&
      CONENCTION_STRING.trim() != ""
    ) {
      await connectToDB(CONENCTION_STRING);
      app.listen(PORT, () => {
        console.info(`[SERVER] : Server Running on PORT ${PORT}`);
      });
    }
  } catch (error: any) {
    console.error(`[SERVER] : Could not run the server`);
    console.error(`[ERROR] : ${error.message}`);
  }
};

start();
