import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

export const isDevelopment = process.env.NODE_ENV === 'development';

export const AppConfig = {
  port: process.env.PORT,
  timezone: process.env.APP_TIMEZONE,
  appName: process.env.APP_NAME,
  environment: process.env.NODE_ENV as string,
  jwtSecret: process.env.JWT_SECRET_KEY,
};

export const DatabaseConfig = (environment: string) => {
  environment = environment.toUpperCase();
  return {
    dialect: process.env.DB_DRIVER as Dialect,
    timezone: 'Etc/UTC',
    ssl: true,
    host: process.env[`DB_${environment}_HOST`] as string,
    username: process.env[`DB_${environment}_USER`] as string,
    database: process.env[`DB_${environment}_NAME`] as string,
    password: process.env[`DB_${environment}_PASSWORD`] as string,
    port: parseInt(process.env[`DB_${environment}_PORT`] as string, 10),
  };
};
