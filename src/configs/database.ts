import debug from 'debug';
import { Sequelize } from 'sequelize-typescript';
import { AppConfig, DatabaseConfig, isDevelopment } from '.';
import models from '../database/models';

const dbEnvironment = DatabaseConfig(AppConfig.environment);

const sequelize = new Sequelize({
  database: dbEnvironment.database,
  username: dbEnvironment.username,
  password: dbEnvironment.password,
  dialect: dbEnvironment.dialect,
  host: dbEnvironment.host,
  port: dbEnvironment.port,
  ssl: false,
  timezone: 'Etc/UTC',
  logging: (msg) => {
    if (isDevelopment) debug(msg);
  },
  models,
});

sequelize.addModels(models);

export default sequelize;
