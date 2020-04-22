import crypto from 'crypto';
import Post from '../models/Post';

export default {
  // insert a comment
  async create(req, res) {
    const { post_id } = req.params;
    const comment_id = crypto.randomBytes(4).toString('HEX');
    const comment_author = req.user_id;
    const { content } = req.body;

    const post = await Post.findOne({ post_id });
    
    const comment = {
      comment_id,
      comment_author,
      content,
    };
    if(!post) {
      return res.status(404).json({error:'Post not found'})
    }
    post.comments.push(comment);

    await post.save();

    return res.json(post);
  },
  // delete a comment

  async delete(req, res) {
    const {post_id, comment_id} = req.params
    const post = await Post.findOne({post_id}) 
    const index = post.comments.findIndex(i => i.comment_id ===comment_id)
    //verifica se o comentário existe
    if (index===-1){
      return res.status(404).json({error:'comment not found'})
    }
    //verifica se o usuário logado é autor do post ou do comentário
    
    if (!(post.author_id === req.user_id ||post.comments[index].comment_author === req.user_id) ){
      return res.status(401).json({error:'unauthorized action'})
    }
    

   
    post.comments.splice(index,1)
    await post.save()
    return res.status(201).json({ message: 'comment successfully deleted' });
  },
};
