import { registerAs } from '@nestjs/config';
import 'dotenv/config';

export default registerAs('config', () => ({
    mongo: {
        connectionStrategy: process.env.MONOGO_CONNECTION_STRING_STRATEGY,
    },
    port: parseInt(process.env.PORT),
    databaseHost: process.env.DB_HOST,
    databasePort: parseInt(process.env.DB_PORT),
    databaseName: process.env.DB_DATABASE,
    databaseUserName: process.env.DB_USERNAME,
    databasePassword: process.env.DB_PASSWORD,
    apiKey: process.env.API_KEY,
    apiKeyProd: process.env.API_KEY_PROD,
    nodeEnv: process.env.NODE_ENV
}));
