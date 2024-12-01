import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });
export default {
  // NODE_ENV: process.env.NODE_ENV,
  // port: process.env.PORT,
  // database_url: process.env.DB_URL,
  // bcrypt_salt_round: process.env.bcrypt_salt_round,
  // JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  // JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  // JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  // JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES,
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
};
