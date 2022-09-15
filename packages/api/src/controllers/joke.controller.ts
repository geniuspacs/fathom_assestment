import { Request, Response } from "express";
import dataSource from "../data-source";
import JokeEntity from "../entities/joke.entity";

export const getJokeById = async (req: Request<{id: number}>, res: Response) => {
    const {
        id
    } = req.params;

    if(!id) {
        res.status(400).send(`Joke with id ${id} not found`)
    }

    const joke = await dataSource.getRepository(JokeEntity).findOneBy({
        id
    });

    joke ? res.status(200).send(joke) : res.status(400).send(`Joke with id ${id} not found`);
}