import { Medication } from 'src/medication/medications.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DroneModelEnum, DroneStatusEnum } from './utils/enums';
import { IsEnum } from 'class-validator';

@Entity()
export class Drone {
  @PrimaryGeneratedColumn('uuid')
  serialNumber: string;

  @Column()
  @IsEnum(DroneModelEnum, { message: 'Invalid drone model' })
  model: string;

  @Column({ nullable: true, default: 0 })
  currentWeight: number;

  @Column()
  batteryPercentage: number;

  @Column({ nullable: true, default: 'idle' as DroneStatusEnum })
  @IsEnum(DroneStatusEnum, { message: 'Invalid drone status' })
  status: string;

  @OneToMany(() => Medication, (medication) => medication.drone, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  medications: Medication[];
}
