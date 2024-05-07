import dataSource from '../database/Connect.js';
import { UserEntity } from '../entities/User.entity.js';
import * as bcrypt from 'bcrypt';

let usersRepository = dataSource.getRepository(UserEntity);

const register = async (userAuth, user) => {
  const findOneUser = await usersRepository.findOneBy({ email: user.email });

  if (findOneUser) {
    throw new Error('Email já cadastrado!');
  }

  if (companie.status === 0) {
    throw new Error('Empresa inativada!');
  }

  user.password = await hashPassword(user.password);

  const userSaved = await usersRepository.save(user);

  return userSaved;
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const update = async (user, id, toUpdate) => {
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

    if (user.access_level !== 1 && userToUpdate.companies_id !== user.companies_id) {
      throw new Error('Não é possível atualizar este usuário!');
    }

    if (user.access_level > userToUpdate.accessLevel) {
      throw new Error('Não é possível atualizar usuário com cargo maior!');
    }

    updated = await usersRepository.update({ id: id }, toUpdate);
  }

  if (!updated.affected) {
    throw new Error('Erro ao atualizar usuario!');
  }
};

export const UsersService = { register, update };
