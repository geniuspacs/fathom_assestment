import * as dotenv from 'dotenv';
dotenv.config();
import { DataSourceOptions } from 'typeorm';

const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: +(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD?.toString(),
    database: process.env.DB_DATABASE,
    entities: [ __dirname + '/entities/**/*.entity.{js,ts}' ],
    migrations: [__dirname + '/migrations/**/*.{js,ts}']
};

export default dataSourceOptions;