import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Baemin-app APIs')
  .setDescription("List NestJS APIs by Topv Dev")
  .setVersion('1.0')
  .addTag('Auth')
  .addBearerAuth()
  .build();
  const documnent = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documnent);

  app.enableCors();

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3001);
}
bootstrap();
