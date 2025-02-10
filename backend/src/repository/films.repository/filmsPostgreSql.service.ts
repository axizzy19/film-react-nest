import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilmEntity } from 'src/films/entities/film.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsPostgreSqlService {
  constructor(
    @InjectRepository(FilmEntity)
    private filmRepository: Repository<FilmEntity>,
  ) {}

  async findAllFilms(): Promise<{ total: number; items: FilmEntity[] }> {
    const [total, items] = await Promise.all([
      this.filmRepository.count(),
      this.filmRepository.find({ relations: { schedule: true } }),
    ]);
    return { total, items };
  }

  async findFilmById(id: string): Promise<FilmEntity> {
    try {
      return this.filmRepository.findOne({
        where: { id },
        relations: { schedule: true },
      });
    } catch {
      throw new NotFoundException(`Фильм не найден`);
    }
  }

  async findFilmSchedule(filmId: string, session: string) {
    const film = await this.findFilmById(filmId);
    const scheduleIndex = film.schedule.findIndex((s) => s.id === session);
    return scheduleIndex;
  }

  async updateFilm(film: FilmEntity): Promise<void> {
    try {
      await this.filmRepository.save(film);
    } catch {
      new BadRequestException(`Не удалось обновить фильм`);
    }
  }
}
