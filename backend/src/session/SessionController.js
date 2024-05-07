import { SessionService } from './SessionService.js';

export const authentication = async (request, response) => {
  try {
    const { email, password } = request.body;

    const payload = await SessionService.authentication(email, password);

    return response.status(200).send(payload);
  } catch (err) {
    return response.status(400).send(err.message);
  }
};

export const sessionUser = async (request, response) => {
  try {
    const user = await SessionService.sessionUser(request.user.id);

    delete user.password;

    return response.status(200).send(user);
  } catch (err) {
    return response.status(400).send(err.message);
  }
};
