import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetFilmDto } from '../../films/dto/films.dto';
import { Film, FilmDocument } from '../../films/schemas/film.schema';

@Injectable()
export class FilmsMongoDBRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<Film>) {}

  private getFilmFromDataBase(): (filmDataBase: GetFilmDto) => GetFilmDto {
    return (root) => {
      return {
        id: root.id,
        rating: root.rating,
        director: root.director,
        tags: root.tags,
        image: root.image,
        cover: root.cover,
        title: root.title,
        about: root.about,
        description: root.description,
        schedule: root.schedule,
      };
    };
  }

  async findAllFilms(): Promise<{ total: number; items: GetFilmDto[] }> {
    const films = await this.filmModel.find({}).lean();
    const total = await this.filmModel.countDocuments({});
    return {
      total,
      items: films.map(this.getFilmFromDataBase()),
    };
  }

  async findFilmById(id: string): Promise<FilmDocument> {
    try {
      const film = await this.filmModel.findOne({ id });
      return film;
    } catch {
      throw new NotFoundException(`Фильм не найден`);
    }
  }

  async findFilmSchedule(filmId: string, session: string) {
    const film = (await this.findFilmById(filmId)).toObject();
    const scheduleIndex = film.schedule.findIndex((s) => s.id === session);
    return scheduleIndex;
  }
}
