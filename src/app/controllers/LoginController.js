import User from '../models/User';

class LoginController {
  async store(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(400).json({ error: 'User do not exists' });
    }

    if (!(await user.compareHash(password))) {
      return response.status(400).json({ error: 'User do not exists' });
    }

    const token = user.generateToken();

    return response.json({ token });
  }
}

export default new LoginController();
