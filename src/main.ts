import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // Asegúrate de tener esto
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // 1. Configurar Prefijo (opcional)
  // app.setGlobalPrefix('api'); 

  // 2. Configurar Swagger (DEBE IR ANTES DEL LISTEN)
  const config = new DocumentBuilder()
  .setTitle('Core REST API Service')
  .setDescription('API para la gestión de inventarios y productos de NestJS')
  .setVersion('1.0')
  .addTag('Products', 'Operaciones relacionadas con los productos')
  .addTag('Categories', 'Gestión de categorías de productos')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 3. Encender el servidor
  await app.listen(3000);
}
bootstrap();