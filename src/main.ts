import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobalMiddleware } from './middlewares/logger';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // Cambiamos el tipo de la aplicación a NestExpressApplication
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Middleware global para logging
  app.use(LoggerGlobalMiddleware);

  // Configuración de validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Configuración de Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Swagger Agua Luz')
    .setDescription('Rutas para el uso del back')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Configuración para servir archivos estáticos desde la carpeta public
  // app.useStaticAssets(join(__dirname, '..', 'public')); 
  app.useStaticAssets(join(__dirname, '..', 'src', 'public'));

  await app.listen(3001);
}
bootstrap();
