import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'src/env';

async function bootstrap() {
  console.log(env('ENV'));
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
