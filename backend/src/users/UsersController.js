import { UsersService } from './UsersService';

export const register = async (request, response) => {
  try {
    const user = await UsersService.register(request.user, request.body);

    delete user.password;

    return response.status(201).send(user);
  } catch (err) {
    return response.status(400).send(err.message);
  }
};

export const update = async (request, response) => {
  try {
    const user = await UsersService.update(request.user, request.params.id, request.body);

    return response.status(200).send(user);
  } catch (err) {
    return response.status(400).send(err.message);
  }
};
