import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Patient } from '../entities/patient.entity';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(createPatientDto: any) {
    const patient = this.patientRepository.create(createPatientDto);
    return await this.patientRepository.save(patient);
  }

  async findAll(name?: string) {
    const where: any = {};

    if (name) {
      where.full_name = Like(`%${name}%`);
    }

    const patients = await this.patientRepository.find({ where });

    return {
      message: patients.length ? 'Patients fetched successfully' : 'No patients found',
      data: patients,
    };
  }

  async remove(id: number) {
    const patient = await this.patientRepository.findOne({ where: { id } });

    if (!patient) {
      throw new NotFoundException('Patient profile not found');
    }

    await this.patientRepository.remove(patient);

    return { message: 'Patient deleted successfully' };
  }
}