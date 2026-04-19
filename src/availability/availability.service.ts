import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecurringAvailability } from './entities/recurring-availability.entity';
import { CustomAvailability } from './entities/custom-availability.entity';
import { Booking } from '../bookings/entities/booking.entity';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(RecurringAvailability)
    private recurringRepo: Repository<RecurringAvailability>,
    @InjectRepository(CustomAvailability)
    private customRepo: Repository<CustomAvailability>,
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
  ) {}

  async addRecurring(doctorId: number, dto: any) {
    const existing = await this.recurringRepo.findOne({ where: { doctorId, dayOfWeek: dto.dayOfWeek } });
    if (existing) throw new ConflictException('Schedule already exists for this day');
    return this.recurringRepo.save(this.recurringRepo.create({ ...dto, doctorId }));
  }

  async addCustom(doctorId: number, dto: any) {
    const existing = await this.customRepo.findOne({ where: { doctorId, date: dto.date } });
    if (existing) throw new ConflictException('Custom availability exists for this date');
    return this.customRepo.save(this.customRepo.create({ ...dto, doctorId }));
  }

  async getAvailableSlots(doctorId: number, date: string, duration: number = 30) {
    let availability: any = await this.customRepo.findOne({ where: { doctorId, date } });
    
    if (!availability) {
      const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'LONG' }).toUpperCase();
      availability = await this.recurringRepo.findOne({ where: { doctorId, dayOfWeek } });
    }

    if (!availability) return [];

    const allSlots = this.generateSlots(availability.startTime, availability.endTime, duration);
    const bookings = await this.bookingRepo.find({ where: { doctorId, date } });
    const bookedStarts = bookings.map(b => b.startTime);

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const currentMins = now.getHours() * 60 + now.getMinutes();

    return allSlots.filter(slot => {
      const isBooked = bookedStarts.includes(slot);
      const isPast = (date === todayStr && this.timeToMinutes(slot) < currentMins);
      return !isBooked && !isPast;
    });
  }

  private generateSlots(start: string, end: string, duration: number): string[] {
    const slots: string[] = [];
    let current = this.timeToMinutes(start);
    const finish = this.timeToMinutes(end);
    while (current + duration <= finish) {
      slots.push(this.minutesToTime(current));
      current += duration;
    }
    return slots;
  }

  private timeToMinutes(time: string): number {
    const [hrs, mins] = time.split(':').map(Number);
    return hrs * 60 + mins;
  }

  private minutesToTime(totalMins: number): string {
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }
}