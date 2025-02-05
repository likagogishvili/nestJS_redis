import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('redis example')
    .setDescription('The redis API description')
    .setVersion('1.0')
    .addTag('redis')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  const app = await NestFactory.create(AppModule);
  SwaggerModule.setup('api', app, documentFactory);
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT') || 5000);
}
bootstrap();
