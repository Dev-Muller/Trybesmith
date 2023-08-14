import { Request, Response } from 'express';
import orderService from '../services/order.service';

async function getAllOrder(request: Request, response: Response): Promise<Response> {
  const { status, data } = await orderService.getAllOrder();
  return response.status(status).json(data);
}

export default {
  getAllOrder,
};