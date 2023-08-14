import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { Status } from '../types/Status';
import { User } from '../types/User';
import { logar } from '../utils/jwt';

async function login(user: User): Promise<Status> {
  if (!user.username || !user.password) {
    return { status: 400,
      data:
        { message: '"username" and "password" are required' } };
  }

  const userData = await UserModel.findOne({ where: {
    username: user.username } });

  if (!userData || !bcrypt.compareSync(user.password, userData.dataValues.password)) {
    return { status: 401,
      data:
    { message: 'Username or password invalid' } };
  }

  const token = logar({ id: userData.dataValues.id, username: userData.dataValues.username });

  return { status: 200, data: { token } };
}

export default {
  login,
};