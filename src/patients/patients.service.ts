import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientsService {
  create(createPatientDto: CreatePatientDto, user: any) {
    return {
      message: 'Patient profile onboarded successfully',
      patient: {
        user_id: user.sub,
        ...createPatientDto,
      },
    };
  }
}