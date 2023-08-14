import { NextFunction, Request, Response } from 'express';

async function nameRequired(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  next();
}

async function nameString(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { name } = req.body;
  if (typeof name !== 'string') {
    return res.status(422).json({ message: '"name" must be a string' });
  }
  next();
}

async function nameLength(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { name } = req.body;
  if (name.length < 3) {
    return res.status(422).json({ message: '"name" length must be at least 3 characters long' });
  }
  next();
}

async function priceRequired(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { price } = req.body;
  if (!price) {
    return res.status(400).json({ message: '"price" is required' });
  }

  next();
}

async function priceString(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { price } = req.body;
  if (typeof price !== 'string') {
    return res.status(422).json({ message: '"price" must be a string' });
  }
  next();
}

async function priceLength(req: Request, res: Response, next: NextFunction): Promise<unknown> {
  const { price } = req.body;
  if (price.length < 3) {
    return res.status(422).json({ message: '"price" length must be at least 3 characters long' });
  }
  next();
}

export {
  nameRequired,
  nameString,
  nameLength,
  priceRequired,
  priceString,
  priceLength,
};