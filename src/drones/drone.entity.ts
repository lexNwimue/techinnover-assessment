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

  @Column()
  weightLimit: number;

  @Column()
  batteryCapacity: number;

  @Column()
  @IsEnum(DroneStatusEnum, { message: 'Invalid drone status' })
  status: string;

  @OneToMany(() => Medication, (medication) => medication.drone, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  medications: Medication[];
}
