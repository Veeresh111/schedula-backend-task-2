import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  full_name: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @Column({ nullable: true })
  blood_group: string;

  @Column({ nullable: true })
  allergies: string;
}