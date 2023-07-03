import { Medication } from 'src/medication/medication.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Drone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column() //TODO: change to use geometry
  weight: number; //TODO: change to Point later

  @Column()
  code: string;

  @Column()
  image: string;

  @OneToMany(() => Medication, (medication) => medication.drones, {
    onDelete: 'SET NULL',
    lazy: true,
  })
  medications: Medication[];
}
