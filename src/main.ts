import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina atributos no establecidos en los dto
      forbidNonWhitelisted: true // alerta sobre los parametros no establecidos en los dto
    })
  )
  await app.listen(3000)
}
bootstrap()
