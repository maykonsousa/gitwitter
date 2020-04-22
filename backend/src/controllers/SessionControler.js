import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import authConfig from '../config/auth';

export default {
  async create(req, res) {
    const { github_username, password } = req.body;
    const user = await User.findOne({ github_username });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    const checkPassword = await bcrypt.compare(password, user.password_hash);
    if (!checkPassword) {
      return res.status(401).json({ error: 'password is invalid' });
    }
    const { user_id, password_hash } = user;
    return res.json({
      user: {
        user_id,
        github_username,
        password_hash,
      },
      token: jwt.sign({ user_id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  },
};
