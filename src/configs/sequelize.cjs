// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config();

const DatabaseConfig = (environment) => {
  environment = environment.toUpperCase();
  return {
    dialect: process.env.DB_DRIVER,
    timezone: 'Etc/UTC',
    host: process.env[`DB_${environment}_HOST`],
    username: process.env[`DB_${environment}_USER`],
    database: process.env[`DB_${environment}_NAME`],
    ssl: process.env[`DB_${environment}_SSL`] === 'TRUE',
    password: process.env[`DB_${environment}_PASSWORD`],
    port: parseInt(process.env[`DB_${environment}_PORT`], 10),
  };
};

module.exports = {
  test: DatabaseConfig('test'),
  production: DatabaseConfig('production'),
  development: DatabaseConfig('development'),
};
