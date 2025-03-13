import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { DevLogger } from './loggers/DevLogger.service';
import { JsonLogger } from './loggers/JsonLogger.service';
import { TskvLogger } from './loggers/TskvLogger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const loggerType = process.env.LOGGER || 'dev';
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  switch (loggerType) {
    case 'dev':
      app.useLogger(new DevLogger());
      break;
    case 'json':
      app.useLogger(new JsonLogger());
      break;
    case 'tskv':
      app.useLogger(new TskvLogger());
      break;
  }
  await app.listen(3000);
}
bootstrap();
