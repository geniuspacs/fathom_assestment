import express, { Application, json } from 'express';
import jokeRouter from './routes/joke.route';
import cors from 'cors';
import {createDatabase} from "typeorm-extension";
import dataSource from "./data-source";
import dataSourceOptions from "./ormconfig";

const app: Application = express();

app.use(json());
app.use(cors({
    origin: '*',
    methods: ['POST']
}));

app.use('/jokes', jokeRouter);

app.listen(process.env.SERVER_PORT, async() => {
    await createDatabase({
        options: dataSourceOptions,
        ifNotExist: true
    });

    await dataSource.initialize();
    console.log(`🚀 Server running on port ${process.env.SERVER_PORT}`)
});

export default app;