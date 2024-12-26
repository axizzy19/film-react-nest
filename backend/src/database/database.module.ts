import { Module, DynamicModule, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { applicationConfig } from 'src/app.config.provider';
import { FilmEntity } from 'src/films/entities/film.entity';
import { ScheduleEntity } from 'src/films/entities/schedule.entity';
import { Film, FilmSchema } from 'src/films/schemas/film.schema';
import { FilmsMongoDBRepository } from 'src/repository/films.repository/filmsMongoDB..repository';
import { FilmsPostgreSqlService } from 'src/repository/films.repository/filmsPostgreSql.service';

@Module({})
export class DatabaseModule {
  static register(dbms: string): DynamicModule {
    const imports = [];
    const providers: Provider[] = [];
    const exports = [];

    switch (dbms) {
      case 'mongodb':
        imports.push(
          MongooseModule.forRoot(applicationConfig.DATABASE_URL),
          MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
        );
        providers.push({
          provide: 'FILMS_REPOSITORY',
          useClass: FilmsMongoDBRepository,
        });
        exports.push('FILMS_REPOSITORY');
        break;

      case 'postgres':
      default:
        imports.push(
          TypeOrmModule.forRoot({
            type: 'postgres',
            host: applicationConfig.DATABASE_HOST,
            port: +applicationConfig.DATABASE_PORT,
            username: applicationConfig.DATABASE_USERNAME,
            password: applicationConfig.DATABASE_PASSWORD,
            database: applicationConfig.DATABASE_NAME,
            entities: [FilmEntity, ScheduleEntity],
            synchronize: false,
          }),
          TypeOrmModule.forFeature([FilmEntity, ScheduleEntity]),
        );
        providers.push({
          provide: 'FILMS_REPOSITORY',
          useClass: FilmsPostgreSqlService,
        });
        exports.push('FILMS_REPOSITORY');
        break;
    }

    return {
      module: DatabaseModule,
      imports,
      providers,
      exports,
    };
  }
}
