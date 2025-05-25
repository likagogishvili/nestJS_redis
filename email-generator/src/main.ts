import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { redisHostPort } from './redis/constants/redi-port-host';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: redisHostPort,
  });

  await app.listen();
}
bootstrap();
