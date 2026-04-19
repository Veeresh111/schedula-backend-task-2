import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateCustomDto {
  @IsDateString()
  @IsNotEmpty()
  date: string; // Expected format: 'YYYY-MM-DD'

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;
}