import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina atributos no establecidos en los dto
      forbidNonWhitelisted: true // alerta sobre los parametros no establecidos en los dto
    })
  )

  const config = new DocumentBuilder() // permite documentar la API
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    // .addTag('NestJS')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  app.enableCors() // permite el acceso a la API desde cualquier origen

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
