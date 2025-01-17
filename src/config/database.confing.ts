import { DataSource, DataSourceOptions } from 'typeorm';
import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env.development' });

const databaseConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  // host: 'postgresdb',
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  // synchronize: true,
  // dropSchema: true,
  logging: true,
};

export default registerAs('typeorm', () => databaseConfig);
export const connectionSource = new DataSource(
  databaseConfig as DataSourceOptions,
);
