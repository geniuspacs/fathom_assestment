import "reflect-metadata"
import * as dotenv from 'dotenv';
dotenv.config();
import createApiServer from "./server";
import {createDatabase} from "typeorm-extension";
import dataSource from "./data-source";
import dataSourceOptions from "./ormconfig";

const app = createApiServer();

app.listen(process.env.SERVER_PORT, async() => {
    await createDatabase({
        options: dataSourceOptions,
        ifNotExist: true
    });

    await dataSource.initialize();
    console.log(`🚀 Server running on port ${process.env.SERVER_PORT}`)
});

export default app;