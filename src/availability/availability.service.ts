import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThan } from 'typeorm';
import { RecurringAvailability, DayOfWeek } from './entities/recurring-availability.entity';
import { CustomAvailability } from './entities/custom-availability.entity';
import { CreateRecurringDto } from './dto/create-recurring.dto';
import { CreateCustomDto } from './dto/create-custom.dto';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(RecurringAvailability)
    private recurringRepo: Repository<RecurringAvailability>,
    @InjectRepository(CustomAvailability)
    private customRepo: Repository<CustomAvailability>,
  ) {}

  // 1. Add Recurring Availability
  async addRecurring(doctorId: number, dto: CreateRecurringDto) {
    // Check for overlapping times on the same day
    const overlap = await this.recurringRepo.findOne({
      where: {
        doctor: { id: doctorId },
        dayOfWeek: dto.dayOfWeek,
        startTime: LessThan(dto.endTime),
        endTime: MoreThan(dto.startTime),
      },
    });

    if (overlap) {
      throw new ConflictException('Time window overlaps with existing recurring availability');
    }

    const newAvailability = this.recurringRepo.create({
      doctor: { id: doctorId },
      dayOfWeek: dto.dayOfWeek,
      startTime: dto.startTime,
      endTime: dto.endTime,
    });

    return this.recurringRepo.save(newAvailability);
  }

  // 2. Add Custom Availability (Override)
  async addCustom(doctorId: number, dto: CreateCustomDto) {
    // Check for overlapping times on the same specific date
    const overlap = await this.customRepo.findOne({
      where: {
        doctor: { id: doctorId },
        date: dto.date,
        startTime: LessThan(dto.endTime),
        endTime: MoreThan(dto.startTime),
      },
    });

    if (overlap) {
      throw new ConflictException('Time window overlaps with existing custom availability');
    }

    const newCustom = this.customRepo.create({
      doctor: { id: doctorId },
      date: dto.date,
      startTime: dto.startTime,
      endTime: dto.endTime,
    });

    return this.customRepo.save(newCustom);
  }

  // 3. Get Availability for a specific date (Handles the Override Logic)
  async getAvailabilityForDate(doctorId: number, dateString: string) {
    // First, check if there is a custom override for this exact date
    const customAvailability = await this.customRepo.find({
      where: { doctor: { id: doctorId }, date: dateString },
      order: { startTime: 'ASC' },
    });

    // If custom availability exists, return it (ignoring recurring)
    if (customAvailability.length > 0) {
      return { type: 'custom', data: customAvailability };
    }

    // If no custom override, figure out the day of the week
    const dateObj = new Date(dateString);
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const dayOfWeek = days[dateObj.getDay()] as DayOfWeek;

    // Fetch recurring availability for that day
    const recurringAvailability = await this.recurringRepo.find({
      where: { doctor: { id: doctorId }, dayOfWeek: dayOfWeek },
      order: { startTime: 'ASC' },
    });

    return { type: 'recurring', data: recurringAvailability };
  }
}