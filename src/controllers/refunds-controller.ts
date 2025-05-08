import { Request, Response } from 'express';

class RefundsController {
  async create(request: Request, response: Response) {
    response.status(200).json({
      message: 'Refund created successfully',
    });
  }
}

export { RefundsController };