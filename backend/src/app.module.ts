import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { applicationConfig, configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { OrderController } from './order/order.controller';
import { FilmsService } from './films/films.service';
import { OrderService } from './order/order.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      renderPath: '/content/afisha/',
    }),
    (() => {
      console.log('Подключаемся к базе данных по адресу:', {
        database_driver: applicationConfig.DATABASE_DRIVER,
        database_url: applicationConfig.DATABASE_URL
      });
      return DatabaseModule.register(applicationConfig.DATABASE_DRIVER);
    })(),
    // DatabaseModule.register(applicationConfig.DATABASE_DRIVER),
  ],
  controllers: [FilmsController, OrderController],
  providers: [configProvider, OrderService, FilmsService],
})
export class AppModule {}
