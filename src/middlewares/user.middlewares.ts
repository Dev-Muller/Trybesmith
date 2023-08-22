import { NextFunction, Request, Response } from 'express';
import { verificar } from '../utils/jwt';

const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<unknown> => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: 'Token not found',
    });
  }
  try {
    const newToken = token.includes('Bearer') ? token.replace('Bearer ', '') : token;
    const verify = verificar(newToken);
    req.body.user = verify;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

async function userIdRequired(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ message: '"userId" is required' });
  }
  next();
}

async function userIdNumber(req: Request, res: Response, next: NextFunction):Promise<unknown> {
  const { userId } = req.body;
  if (typeof userId !== 'number') {
    return res.status(422).json({ message: '"userId" must be a number' });
  }
  next();
}

async function
productIdsRequired(req: Request, res: Response, next: NextFunction):Promise<unknown> {
  const { productIds } = req.body;
  if (!productIds) {
    return res.status(400).json({ message: '"productIds" is required' });
  }
  next();
}

async function productIdsArray(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { productIds } = req.body;
  if (!Array.isArray(productIds)) {
    return res.status(422).json({ message: '"productIds" must be an array' });
  }
  next();
}

async function productIdsNumber(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { productIds } = req.body;
  if (productIds.length === 0) {
    return res.status(422).json({ message: '"productIds" must include only numbers' });
  }
  next();
}

export {
  validateToken,
  userIdRequired,
  userIdNumber,
  productIdsRequired,
  productIdsArray,
  productIdsNumber,
};