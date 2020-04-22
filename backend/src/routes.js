import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionControler';
import PostController from './controllers/PostController';
import LikeController from './controllers/LikeController';
import CommentController from './controllers/CommentController';
import authMiddleware from './middlewares/auth';

const routes = Router();
// open routes
routes.post('/users', UserController.create); // criar usuário
routes.post('/login', SessionController.create); // fazer login
routes.get('/users', UserController.index); // listar todos os usuários
// closed routes
routes.use(authMiddleware); // autenticação
routes.delete('/users', UserController.delete); // excluir conta
routes.put('/users/', UserController.update); // atualizar senha
routes.post('/posts', PostController.create); // criar postagem
routes.get('/posts', PostController.index); // listar todas as postagens
routes.get('/myposts', PostController.show); // listar somente as postagens do usuário logado
routes.delete('/posts/:post_id', PostController.delete); // deletar uma postagem
routes.post('/posts/like/:post_id', LikeController.create ) //dar like em um post
routes.post('/posts/:post_id', CommentController.create); // comentar uma postagem
routes.delete('/posts/:post_id/:comment_id', CommentController.delete); // deletar um comentário

export default routes;
