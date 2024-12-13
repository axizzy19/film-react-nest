import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository/films.repository';
import { OrderDataDto, TicketDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(
    orderData: OrderDataDto,
  ): Promise<{ items: TicketDTO[]; total: number }> {
    const tickets = orderData.tickets;
    console.log('начало заказа');
    for (const ticket of tickets) {
      const film = (
        await this.filmsRepository.findFilmById(ticket.film)
      ).toObject();
      const schedule = await this.filmsRepository.findFilmSchedule(
        ticket.film,
        ticket.session,
      );
      const place = `${ticket.row}:${ticket.seat}`;

      if (film.schedule[schedule].taken.includes(place)) {
        throw new BadRequestException('Место уже занято');
      }
      this.updateSeats(ticket.film, schedule, place);
    }
    return { items: tickets, total: tickets.length };
  }

  async updateSeats(filmId: string, scheduleIndex: number, place: string) {
    const film = await this.filmsRepository.findFilmById(filmId);
    const takenPlaces = `schedule.${scheduleIndex.toString()}.taken`;
    try {
      await film.updateOne({ $push: { [takenPlaces]: place } });
    } catch (error) {
      new ConflictException('Ошибка сохранения мест');
    }
  }
}
