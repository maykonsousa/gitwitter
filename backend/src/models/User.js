import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  user_id: String,
  github_username: String,
  password_hash: String,
  name: String,
  bio: String,
  avatar_url: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('user', UserSchema);
