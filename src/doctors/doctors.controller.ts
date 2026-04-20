import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Delete,
  Param,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post('onboard')
  create(@Body() createDoctorDto: any) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  findAll(
    @Query('specialization') specialization?: string,
    @Query('name') name?: string,
  ) {
    return this.doctorsService.findAll(specialization, name);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(Number(id));
  }
}