import Post from '../models/Post'


export default {
  async create(req, res){
    const post = await Post.findOne({post_id:req.params.post_id})
    if(!post){
      return res.status(401).json({error: 'Post not found'})
    }
    post.set({likes: post.likes +1}) 
    post.save()
    return res.json(post) 
  }
}