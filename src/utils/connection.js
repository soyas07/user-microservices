import Sequelize from 'sequelize';
import dotenv from 'dotenv';

// load the environment vairables
const env = (process.env.npm_lifecycle_event === 'dev') ? '.env.dev' : '.env';
dotenv.config({ path: env });

console.log(process.env.DB_HOST);

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT,
    },
);

export default sequelize;
