import { Request, Response } from 'express';
import { z } from 'zod';

class SessionController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(request.body);

    response.json({ message: 'Session created' });
  }
}

export { SessionController };