import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';


const config: DataSourceOptions = {
    "type": "mysql",
    "host": process.env.DB_HOST,
    "port": Number(process.env.DB_PORT),
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "entities": [
        "dist/**/*.entity{.ts,.js}"
    ],
    "synchronize": true,
}
export default config;