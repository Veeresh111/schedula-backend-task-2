import { Controller, Post, Body, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateRecurringDto } from './dto/create-recurring.dto';
import { CreateCustomDto } from './dto/create-custom.dto';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post('recurring/:doctorId')
  addRecurring(@Param('doctorId') doctorId: string, @Body() dto: CreateRecurringDto) {
    return this.availabilityService.addRecurring(+doctorId, dto);
  }

  @Post('custom/:doctorId')
  addCustom(@Param('doctorId') doctorId: string, @Body() dto: CreateCustomDto) {
    return this.availabilityService.addCustom(+doctorId, dto);
  }

  @Get('slots/:doctorId')
  getSlots(
    @Param('doctorId') doctorId: string,
    @Query('date') date: string,
    @Query('duration') duration?: string,
  ) {
    return this.availabilityService.getAvailableSlots(+doctorId, date, duration ? +duration : 30);
  }
}