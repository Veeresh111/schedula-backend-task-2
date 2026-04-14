import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column()
  specialization: string;

  @Column()
  bio: string;

  @Column('int')
  consultation_fee: number;
}