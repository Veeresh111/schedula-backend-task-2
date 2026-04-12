import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('doctors')
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  full_name: string;

  @Column()
  specialization: string;

  @Column()
  qualification: string;

  @Column()
  experience_years: number;

  @Column({ nullable: true })
  bio: string;
}