import { Inject, Injectable } from '@nestjs/common';
import { FilmsMongoDBRepository } from '../repository/films.repository/filmsMongoDB..repository';
import { FilmsPostgreSqlService } from 'src/repository/films.repository/filmsPostgreSql.service';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('FILMS_REPOSITORY')
    private readonly filmsRepository:
      | FilmsMongoDBRepository
      | FilmsPostgreSqlService,
  ) {}

  async getAllFilms() {
    return this.filmsRepository.findAllFilms();
  }

  async getScheduleFilm(id: string) {
    let film;
    if (this.filmsRepository instanceof FilmsMongoDBRepository) {
      film = (await this.filmsRepository.findFilmById(id)).toObject();
    } else {
      film = await this.filmsRepository.findFilmById(id);
    }
    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }
}
