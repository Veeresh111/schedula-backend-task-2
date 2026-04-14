import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';

@Injectable()
export class DoctorsService {
  create(createDoctorDto: CreateDoctorDto, user: any) {
    return {
      message: 'Doctor profile onboarded successfully',
      doctor: {
        user_id: user.sub,
        ...createDoctorDto,
      },
    };
  }
  findAll() {
  return [
    {
      id: 1,
      full_name: 'Dr John',
      specialization: 'Cardiology',
      qualification: 'MBBS',
      experience_years: 5,
      bio: 'Heart specialist',
    },
    {
      id: 2,
      full_name: 'Dr Smith',
      specialization: 'Dermatology',
      qualification: 'MBBS, MD',
      experience_years: 8,
      bio: 'Skin specialist',
    },
  ];
}
}