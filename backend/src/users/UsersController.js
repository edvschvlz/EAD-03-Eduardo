import { UsersService } from './UsersService.js';

export const register = async (request, response) => {
  try {
    const user = await UsersService.register(request.body);

    delete user.password;

    return response.status(201).send(user);
  } catch (err) {
    return response.status(400).send(err.message);
  }
};

export const update = async (request, response) => {
  try {
    const user = await UsersService.update(request.params.id, request.body);

    return response.status(204).send(user);
  } catch (err) {
    return response.status(400).send(err.message);
  }
};

export const getAll = async (request, response) => {
  try {
    const users = await UsersService.getAll();

    return response.status(200).send(users);
  } catch (err) {
    return response.status(400).send(err.message);
  }
};

export const remove = async (request, response) => {
  try {
    const user = await UsersService.remove(request.params.id);

    return response.status(204).send(user);
  } catch (err) {
    return response.status(400).send(err.message);
  }
};
