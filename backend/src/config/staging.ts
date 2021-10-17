import { Config } from './index'

const config: Config = {
  port: parseInt(process.env.PORT || '80'),
  db: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'postgres',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASWORD || ''
    }
  }
}

export default config
