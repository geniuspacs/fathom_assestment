import { Router } from 'express';
import { getJokeById } from '../controllers/joke.controller';

const jokeRouter = Router();

jokeRouter.post('/:id', getJokeById);

export default jokeRouter;