import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport'

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const port = process.env.SERVOR_PORT


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize())
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port); 
}

bootstrap();
