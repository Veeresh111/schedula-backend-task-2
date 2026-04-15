import { IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { DayOfWeek } from '../entities/recurring-availability.entity';

export class CreateRecurringDto {
  @IsEnum(DayOfWeek)
  @IsNotEmpty()
  dayOfWeek: DayOfWeek;

  @IsString()
  @IsNotEmpty()
  startTime: string; // Expected format: 'HH:mm' (e.g., '09:00')

  @IsString()
  @IsNotEmpty()
  endTime: string;   // Expected format: 'HH:mm' (e.g., '13:00')
}