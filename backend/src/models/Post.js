import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  post_id: String,

  content: String,

  likes: {
    type: Number,
    default: 0,
  },

  author_id: String,

  comments: [
    {
      comment_id: String,
      comment_author: String,
      content: String,
      created_At: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  created_At: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('post', PostSchema);
