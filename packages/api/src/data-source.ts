import { DataSource } from "typeorm";
import dataSourceOptions from "./ormconfig";

const dataSource: DataSource = new DataSource(dataSourceOptions);

export default dataSource;