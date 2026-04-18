import { Controller, Post, Body } from '@nestjs/common';
import { BookingsService } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() body: { 
    patientName: string; 
    doctorId: number; 
    date: string; 
    startTime: string; 
    endTime: string 
  }) {
    return this.bookingsService.createBooking(body);
  }
}