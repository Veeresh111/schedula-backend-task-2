import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Doctor } from '../../doctors/entities/doctor.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  patientName: string;

  @Column()
  date: string; // Format: YYYY-MM-DD

  @Column()
  startTime: string; // Format: HH:mm

  @Column()
  endTime: string; // Format: HH:mm

  @ManyToOne('Doctor')
  doctor: Doctor;
  
  @Column()
  doctorId: number;
}