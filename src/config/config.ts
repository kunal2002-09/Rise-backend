import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
export const env = {
  DB_NAME: process.env.DB_NAME || 'new_schema',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '12345678',
  DB_HOST: process.env.DB_HOST || '0.tcp.in.ngrok.io',
  DB_PORT: process.env.DB_PORT || 17385,
  DB_DIALECT: process.env.DB_DIALECT || 'mysql',
  JWT_SECRET: process.env.JWT_SECRET || 'fd6c50e8eb6acdfa4876393284647550fe621da46d418b8f89c36446301099cf',
};
// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.dev') });

// Define the schema for validation
const schema = Joi.object({
  DB_NAME: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(3306), // MySQL default port
  DB_DIALECT: Joi.string().valid('mysql', 'postgres', 'sqlite', 'mssql').required(),
}).unknown(); // Allow additional unknown environment variables
// Validate environment variables
const { error, value: envVars } = schema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
console.log(envVars.DB_NAME);

// Configuration object
export const config = {
  env: envVars.NODE_ENV,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
  },
  development: {
    MYSQL_SETTINGS: {
      DATABASE: envVars.DB_NAME,
      USER: envVars.DB_USER,
      PASSWORD: envVars.DB_PASSWORD,
      HOST: envVars.DB_HOST,
      PORT: envVars.DB_PORT,
      DIALECT: envVars.DB_DIALECT,
    }
  },
  test: {
    MYSQL_SETTINGS: {
      DATABASE: envVars.DB_NAME,
      USER: envVars.DB_USER,
      PASSWORD: envVars.DB_PASSWORD,
      HOST: envVars.DB_HOST,
      PORT: envVars.DB_PORT,
      DIALECT: envVars.DB_DIALECT,
    }
  },
  production: {
    MYSQL_SETTINGS: {
      DATABASE: envVars.DB_NAME,
      USER: envVars.DB_USER,
      PASSWORD: envVars.DB_PASSWORD,
      HOST: envVars.DB_HOST,
      PORT: envVars.DB_PORT,
      DIALECT: envVars.DB_DIALECT,
    }
  },
};


