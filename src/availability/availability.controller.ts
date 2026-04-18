import { Controller, Post, Body, Get, Param, Query, UseGuards, Request } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { CreateRecurringDto } from './dto/create-recurring.dto';
import { CreateCustomDto } from './dto/create-custom.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  // POST /availability/recurring/:doctorId
  @Post('recurring/:doctorId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('doctor')
  addRecurring(@Param('doctorId') doctorId: string, @Body() dto: CreateRecurringDto) {
    // Now we use the ID from the URL instead of the Token
    return this.availabilityService.addRecurring(+doctorId, dto);
  }

  // POST /availability/custom/:doctorId
  @Post('custom/:doctorId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('doctor')
  addCustom(@Param('doctorId') doctorId: string, @Body() dto: CreateCustomDto) {
    return this.availabilityService.addCustom(+doctorId, dto);
  }

  // GET /availability/:doctorId?date=YYYY-MM-DD
  // Anyone (patients or doctors) can check a doctor's availability
  @Get(':doctorId')
  getAvailability(
    @Param('doctorId') doctorId: string,
    @Query('date') date: string,
  ) {
    return this.availabilityService.getAvailabilityForDate(+doctorId, date);
  }
}