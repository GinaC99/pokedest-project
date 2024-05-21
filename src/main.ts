import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2/')
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      // esto es para habilitar la conversion automatica, el contra es que se necesita mas memoria para realizar
      // este proceso
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )
  await app.listen(process.env.PORT);
  console.log(`Corriendo en el puerto ${process.env.PORT}`)
}
bootstrap();
