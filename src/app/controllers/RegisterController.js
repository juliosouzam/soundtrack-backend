import User from '../models/User';

class RegisterController {
  async store(request, response) {
    const { name, email, password } = request.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return response.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    delete user.password;

    return response.json(user);
  }
}

export default new RegisterController();
