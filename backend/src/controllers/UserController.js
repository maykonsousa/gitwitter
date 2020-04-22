import axios from 'axios';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import User from '../models/User';

export default {
  // list all users
  async index(req, res) {
    const users = await User.find({});
    return res.json(users);
  },

  // create a new user
  async create(req, res) {
    const userExists = await User.findOne({
      github_username: req.body.github_username,
    });

    if (userExists) {
      return res.status(401).json({ error: 'user already exists' });
    }
    const { github_username, password } = req.body;
    const user_id = crypto.randomBytes(4).toString('HEX');
    const password_hash = bcrypt.hashSync(password, 4);

    try {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { name, bio, avatar_url } = apiResponse.data;

      const user = await User.create({
        user_id,
        github_username,
        password_hash,
        name,
        bio,
        avatar_url,
      });
      return res.json(user);
    } catch (error) {
      return res.status(404).json({ error: 'Github user not found' });
    }
  },

  // delete the acount
  async delete(req, res) {
    const user = await User.find({ user_id: req.user_id });
    if (!user) {
      return res.json({ error: 'User not found' });
    }
    await User.deleteOne({ user_id: req.user_id });
    return res.json();
  },

  // change password
  async update(req, res) {
    const { password, confirmPassword } = req.body;
    const user = await User.find({ user_id: req.user_id });
    if (!user) {
      return res.json({ error: 'User not found' });
    }
    if (password !== confirmPassword) {
      return res.status(401).json({ error: 'passwords does not match' });
    }
    const newPassword_hash = bcrypt.hashSync(password, 4);
    await User.updateOne({ password_hash: newPassword_hash });
    return res.json({ message: 'password updated successfully' });
  },
};
