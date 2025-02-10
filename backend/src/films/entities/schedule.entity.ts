import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FilmEntity } from './film.entity';

@Entity('schedules')
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  @IsString()
  daytime: string;

  @Column()
  @IsNumber()
  hall: number;

  @Column()
  @IsNumber()
  rows: number;

  @Column()
  @IsNumber()
  seats: number;

  @Column()
  @IsNumber()
  price: number;

  @Column()
  @IsString()
  taken: string;

  @Column()
  @IsString()
  filmId: string;

  @ManyToOne(() => FilmEntity, (film) => film.schedule)
  film: FilmEntity;
}
