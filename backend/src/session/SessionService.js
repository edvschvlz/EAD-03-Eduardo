import dataSource from '../database/Connect.js';
import { UserEntity } from '../users/entities/UserEntity.js';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

let usersRepository = dataSource.getRepository(UserEntity);

const authentication = async (email, password) => {
  const user = await usersRepository.findOne({ where: { email: email } });

  if (!user) {
    throw new Error('Usuário não existe!');
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error('Credenciais incorretas!');
  }

  const payload = {
    name: user.name,
    id: user.id,
    email: user.email,
  };

  const access_token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return { auth: true, access_token: access_token, user: payload };
};

export const SessionService = {
  authentication,
};
