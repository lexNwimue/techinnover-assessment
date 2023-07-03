import { Drone } from 'src/drones/drone.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Medication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  weight: number;

  @Column()
  code: string;

  @Column()
  image: string;

  @ManyToOne(() => Drone, (drone) => drone.medications, {
    onDelete: 'SET NULL',
    lazy: true,
  })
  drone: Drone;
}
