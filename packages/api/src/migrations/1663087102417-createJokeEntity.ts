import { MigrationInterface, QueryRunner } from "typeorm";
import {readFileSync} from 'fs';
import path from "path";
import { Joke } from "@joke_geniuspacs/lib";

export class createJokeEntity1663087102417 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const jokes = readFileSync(path.join(__dirname, '../../data/jokes.json'), 'utf-8');
        const parsedJokes: [] = JSON.parse(jokes).map((joke: Joke) => ({
            ...joke,
            type: joke.type.replaceAll("'", "\'"),
            setup: joke.setup.replaceAll("'", "\'"),
            punchline: joke.punchline.replaceAll("'", "\'"),
        }));

        await queryRunner.query(`
            CREATE TABLE jokes(
                id SERIAL PRIMARY KEY,
                type VARCHAR(20) NOT NULL,
                setup VARCHAR(200) NOT NULL,
                punchline VARCHAR(200) NOT NULL
            );
        `);

        parsedJokes.forEach(async(joke: any) => {
            await queryRunner.query('INSERT INTO jokes(id, type, setup, punchline) values($1, $2, $3, $4)', [
                joke.id,
                joke.type,
                joke.setup,
                joke.punchline
            ]);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE jokes;
        `);
    }

}
