import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @Column('int')
  age: number;

  @Column()
  gender: string;

  @Column()
  problem: string;
}