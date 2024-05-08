import dataSource from '../database/Connect.js';
import { UserEntity } from './entities/UserEntity.js';
import * as bcrypt from 'bcrypt';

let usersRepository = dataSource.getRepository(UserEntity);

const register = async (user) => {
  const findOneUser = await usersRepository.findOneBy({ email: user.email });

  if (findOneUser) {
    throw new Error('Email já cadastrado!');
  }

  user.password = await hashPassword(user.password);

  const userSaved = await usersRepository.save(user);

  return userSaved;
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const update = async (id, toUpdate) => {
  let updated = null;
  if (id) {
    const userToUpdate = await usersRepository.findOneBy({ id: id });

    if (toUpdate.email !== userToUpdate.email) {
      const findOneUser = await usersRepository.findOneBy({ email: toUpdate.email });

      if (findOneUser) {
        throw new Error('Email já cadastrado!');
      }
    }

    if (toUpdate.password) {
      toUpdate.password = await hashPassword(toUpdate.password);
    }

    updated = await usersRepository.update({ id: id }, toUpdate);
  }

  if (!updated.affected) {
    throw new Error('Erro ao atualizar usuario!');
  }
};

const getAll = async () => {
  return await usersRepository.find();
};

export const UsersService = { register, update, getAll };
