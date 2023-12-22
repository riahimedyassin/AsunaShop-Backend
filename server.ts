import express from "express";
import dotenv from "dotenv";
import { connectToDB } from "./config/connect";
import { router as ProductRoute } from "./routes/Product.route";
import { router as CompanyRoute } from "./routes/Company.route";
import { router as UserRoute } from "./routes/User.route";
import { router as ClientRoute } from "./routes/Client.route";
import { ErrorHandler } from "./error/handler/ErrorHandler";
import cors from "cors";
import { API_RULES } from "./middlewares/rules/API_RULES";
import { BASE_URL } from "./constants/GENERAL";
import { IP_CHECKER } from "./middlewares/security/IP_CHECKER";

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
app.set("trust proxy", true);
app.use(IP_CHECKER);
app.use(`${BASE_URL}/products`, ProductRoute);
app.use(`${BASE_URL}/companies`, CompanyRoute);
app.use(`${BASE_URL}/users`, UserRoute);
app.use(`${BASE_URL}/clients`, ClientRoute);
app.use(ErrorHandler);

/*
  ENV
*/
const PORT = process.env.PORT || 3000;
const CONENCTION_STRING = process.env.CONNECTION_STRING ;
export const SECRET_HASH_STRING = <string>process.env.SECRET_HASH_STRING

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
    else {
      console.error(`[SERVER] : Could not run the server`);
    }
  } catch (error: any) {
    console.error(`[SERVER] : Could not run the server`);
    console.error(`[ERROR] : ${error.message}`);
  }
};

start();
