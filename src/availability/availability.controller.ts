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

  // POST /availability/recurring
  @Post('recurring')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('doctor')
  addRecurring(@Request() req, @Body() dto: CreateRecurringDto) {
    // req.user.sub comes from your JWT token payload (the user's ID)
    return this.availabilityService.addRecurring(req.user.sub, dto);
  }

  // POST /availability/custom
  @Post('custom')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('doctor')
  addCustom(@Request() req, @Body() dto: CreateCustomDto) {
    return this.availabilityService.addCustom(req.user.sub, dto);
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