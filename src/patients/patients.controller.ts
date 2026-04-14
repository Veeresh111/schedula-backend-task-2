import { Body, Controller, Post, Get, Query, Delete, Param } from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post('onboard')
  create(@Body() createPatientDto: any) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  findAll(@Query('name') name?: string) {
    return this.patientsService.findAll(name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(Number(id));
  }
}