import crypto from 'crypto';
import Post from '../models/Post';

export default {
  // list all post
  async index(req, res) {
    const posts = await Post.find({}).sort({ created_At: 'desc' });
    return res.json(posts);
  },
  // list authenticated user post
  async show(req, res) {
    const myPosts = await Post.find({ author_id: req.user_id }).sort({
      created_At: 'desc',
    });
    return res.json(myPosts);
  },
  // create a new post
  async create(req, res) {
    const post_id = crypto.randomBytes(4).toString('HEX');
    const { content } = req.body;
    const author_id = req.user_id;

    if (!author_id) {
      return res.status(401).json({ error: 'Login is required' });
    }
    try {
      const post = await Post.create({
        post_id,
        content,
        author_id,
      });

      return res.json(post);
    } catch (error) {
      return res.status(500).json({ error: 'bad request' });
    }
  },
  async delete(req, res) {
    const { post_id } = req.params;
    const post = await Post.find({ post_id });
    if (!post.user_id === res.user_id) {
      return res.status(404).json({ error: 'unauthorized request' });
    }
    await Post.deleteOne({ post_id });
    return res.status(200).json({ message: 'post deleted successfully' });
  },
};
