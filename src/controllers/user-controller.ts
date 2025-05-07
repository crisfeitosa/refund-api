import { Request, Response } from "express";

class UserController {
  async create(request: Request, response: Response) {
    response.json({ message: "User created" });
  }
}

export { UserController };