import { AppError } from '@/utils/AppError';
import { Request, Response, NextFunction, request } from 'express';

function verifyUserAuthorization(role: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if(!request.user || !role.includes(request.user.role)) {
      throw new AppError('Unauthorized', 401);
    } 
    
    return next();
  }
}

export { verifyUserAuthorization };