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
  findAll(specialization?: string, name?: string) {
  const doctors = [
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
    {
      id: 3,
      full_name: 'Dr Alice',
      specialization: 'Neurology',
      qualification: 'MBBS, DM',
      experience_years: 10,
      bio: 'Brain specialist',
    },
  ];

  let filteredDoctors = doctors;

  if (specialization) {
    filteredDoctors = filteredDoctors.filter(
      (doctor) =>
        doctor.specialization.toLowerCase() ===
        specialization.toLowerCase(),
    );
  }

  if (name) {
    filteredDoctors = filteredDoctors.filter((doctor) =>
      doctor.full_name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (filteredDoctors.length === 0) {
    return {
      message: 'No doctors found',
      data: [],
    };
  }

  return filteredDoctors;
}
}