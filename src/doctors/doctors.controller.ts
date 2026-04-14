import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post('onboard')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('doctor')
  create(@Body() dto: CreateDoctorDto, @Req() req: any) {
    return this.doctorsService.create(dto, req.user);
  }
  @Get()
findAll() {
  return this.doctorsService.findAll();
}
}