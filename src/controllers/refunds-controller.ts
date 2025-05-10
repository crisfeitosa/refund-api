import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { Request, Response } from 'express';
import { z } from 'zod';

const CategoriesEnum = z.enum([
  "food",
  "others",
  "services",
  "transport",
  "accommodation"
]);

class RefundsController {
  async create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(1, { message: "Informe o nome da solicitação" }),
      category: CategoriesEnum,
      amount: z.number().positive({ message: "Ovalor precisa ser positivo" }),
      filename: z.string().min(20)
    });

    const { name, category, amount, filename } = bodySchema.parse(request.body);

    if(!request.user?.id) {
      throw new AppError("Unauthorized", 401);
    }

    const refund = await prisma.refunds.create({
      data: {
        name,
        category,
        amount,
        filename,
        userId: request.user.id
      }
    })

    response.status(201).json(refund);
  };

  async index(request: Request, response: Response) {
    const querySchema = z.object({
      name: z.string().optional(),
    });

    const { name } = querySchema.parse(request.query);

    const refunds = await prisma.refunds.findMany({
      where: {
        user: {
          name: {
            contains: name?.trim(),
          }
        }
      },
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });

    response.json(refunds);
  }
}

export { RefundsController };