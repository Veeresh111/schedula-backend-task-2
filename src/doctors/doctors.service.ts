import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async create(createDoctorDto: any) {
    const doctor = this.doctorRepository.create(createDoctorDto);
    return await this.doctorRepository.save(doctor);
  }

  async findAll(specialization?: string, name?: string) {
    const where: any = {};

    if (specialization) {
      where.specialization = Like(`%${specialization}%`);
    }

    if (name) {
      where.full_name = Like(`%${name}%`);
    }

    const doctors = await this.doctorRepository.find({ where });

    return {
      message: doctors.length
        ? 'Doctors fetched successfully'
        : 'No doctors found',
      data: doctors,
    };
  }

  async remove(id: number) {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    await this.doctorRepository.remove(doctor);

    return { message: 'Doctor deleted successfully' };
  }
}