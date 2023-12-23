import { NextFunction, Response, Request } from "express";
import Http from "../lib/Http";
import Client from "../models/Client.model";
import { Token } from "../utils/Token";
import { CLIENT_IMMUTABLES } from "../constants/GENERAL";
import AsyncWrapper from "../decorators/AsyncWrapper";

export default class ClientController {
  @AsyncWrapper
  public static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email) return next(Http.error("Please enter a valid email", 400));
    if (!password)
      return next(Http.error("Please enter a valid password", 400));
    const id = await Client.login(email, password);
    if (!id) return next(Http.error("Invalid Email or Password", 400));
    const token = Token.getToken(id);
    return Http.token(res, token);
  }

  @AsyncWrapper
  public static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const client = new Client(req.body);
    const registered = await Client.register(client);
    if (registered)
      return Http.response(res, "Client registered successfully", 200, client);
    next(Http.error("Could not register Client", 500));
  }

  @AsyncWrapper
  public static async getAllClients(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const clients = await Client.find();
    if (clients)
      return Http.response(res, "Clients retrieved successfully", 200, clients);
    return next(Http.error("Cannot retrieve clients", 500));
  }

  @AsyncWrapper
  public static async getClient(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    if (!id) return next(Http.error("Please provide the client's ID", 400));
    const client = await Client.findById(id);
    if (client)
      return Http.response(res, "Client retrieved successfully", 200, client);
    return next(Http.error("Client not found", 404));
  }

  @AsyncWrapper
  public static async updateClient(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const changes = req.body;
    if (!changes) return next(Http.error("Please provide any changes", 400));
    CLIENT_IMMUTABLES.forEach((immutable) => {
      if (Object.keys(changes).includes(immutable))
        return next(Http.error(`You cannot modify ${immutable}`, 400));
    });
    const user = (req as any).user;
    const client = await Client.findOneAndUpdate({ _id: user }, changes, {
      new: true,
    });
    if (client)
      return Http.response(res, "Client updated successfully", 201, client);
    return next(Http.error("Cannot update client", 500));
  }

  @AsyncWrapper
  public static async deleteClient(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user = (req as any).user;
    await Client.findOneAndDelete({ _id: user });
    return Http.response(res, "Client deleted successfully", 204);
  }
}
