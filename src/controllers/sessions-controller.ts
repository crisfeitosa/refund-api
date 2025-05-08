import { Request, Response } from 'express';

class SessionController {
  async create(request: Request, response: Response) {
    response.json({ message: 'Session created' });
  }
}

export { SessionController };