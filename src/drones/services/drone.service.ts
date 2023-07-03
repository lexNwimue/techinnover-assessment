import { Injectable } from '@nestjs/common';
import { RegisterDroneDto } from '../dto/register-drone-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Drone } from '../drone.entity';
import { Repository } from 'typeorm';
import { DroneModelEnum, DroneStatusEnum } from '../utils/enums';

@Injectable()
export class DronesService {
  constructor(
    @InjectRepository(Drone) private dronesRepository: Repository<Drone>,
  ) {}

  create(registerDrone: RegisterDroneDto): Promise<Drone> {
    const newDrone = this.dronesRepository.create(registerDrone);
    return this.dronesRepository.save(newDrone);
  }

  findAll(): Promise<Drone[]> {
    return this.dronesRepository.find();
  }

  async findOne(
    serialNumber: string,
    status?: DroneStatusEnum,
  ): Promise<Drone | { failed: string }> {
    return this.dronesRepository
      .findOneByOrFail({
        serialNumber,
      })
      .catch((err) => {
        console.error(err);
        return { failed: 'There was an error finding the Drone....' };
      });
  }

  async remove(serialNumber: string): Promise<Drone | object> {
    try {
      const Drone = await this.dronesRepository.findOneByOrFail({
        serialNumber,
      });
      return this.dronesRepository.remove(Drone);
    } catch (error) {
      console.error(error);
      return { err: 'Error encountered while attempting to delete Drone' };
    }
  }

  async loadDrone(serialNumber: string): Promise<Drone | object> {
    try {
      const Drone = await this.dronesRepository.findOneByOrFail({
        serialNumber,
      });
      return this.dronesRepository.remove(Drone);
    } catch (error) {
      console.error(error);
      return { err: 'Error encountered while attempting to delete Drone' };
    }
  }

  async checkBatteryLevel(serialNumber: string): Promise<Drone | object> {
    try {
      const Drone = await this.dronesRepository.findOneByOrFail({
        serialNumber,
      });
      return this.dronesRepository.remove(Drone);
    } catch (error) {
      console.error(error);
      return { err: 'Error encountered while attempting to delete Drone' };
    }
  }
}
