import { Request, Response } from 'express';
import loginService from '../services/login.service';

async function login(request: Request, response: Response): Promise<Response> {
  const inputData = request.body;
  const { status, data } = await loginService.login(inputData);
  return response.status(status).json(data);
}

export default {
  login,
};