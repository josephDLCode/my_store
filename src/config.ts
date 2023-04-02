import { registerAs } from '@nestjs/config'

// Permite tipar las variables de entorno
export default registerAs('database', () => ({
  database: {
    name: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
  },
  apiKey: process.env.API_KEY
}))
