import { registerAs } from '@nestjs/config'

// Permite tipar las variables de entorno
export default registerAs('database', () => ({
  database: {
    name: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
  },
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET
}))
