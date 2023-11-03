import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.SERVOR_PORT);
}

bootstrap();
