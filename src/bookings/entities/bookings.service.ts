import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
  ) {}

  async createBooking(dto: any) {
    const existing = await this.bookingRepo.findOne({
      where: {
        doctorId: dto.doctorId,
        date: dto.date,
        startTime: dto.startTime,
      },
    });

    if (existing) {
      throw new ConflictException('This slot is already booked');
    }

    const booking = this.bookingRepo.create(dto);
    return this.bookingRepo.save(booking);
  }
}