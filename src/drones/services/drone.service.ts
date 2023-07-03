import { Injectable } from '@nestjs/common';
import { RegisterDroneDto } from '../dto/create-drone-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Drone } from '../drone.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Drone) private usersRepository: Repository<Drone>,
  ) {}

  create(registerDrone: RegisterDroneDto): Promise<Drone> {
    const newUser = this.usersRepository.create(registerDrone);
    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<Drone[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<Drone | { failed: string }> {
    return this.usersRepository
      .findOneByOrFail({
        id,
      })
      .catch((err) => {
        console.error(err);
        return { failed: 'There was an error finding the Drone....' };
      });
  }

  async remove(id: string): Promise<Drone | object> {
    try {
      const Drone = await this.usersRepository.findOneByOrFail({ id });
      return this.usersRepository.remove(Drone);
    } catch (error) {
      console.error(error);
      return { err: 'Error encountered while attempting to delete Drone' };
    }
  }

  async loadDrone(id: string): Promise<Drone | object> {
    try {
      const Drone = await this.usersRepository.findOneByOrFail({ id });
      return this.usersRepository.remove(Drone);
    } catch (error) {
      console.error(error);
      return { err: 'Error encountered while attempting to delete Drone' };
    }
  }

  async checkBatteryLevel(id: string): Promise<Drone | object> {
    try {
      const Drone = await this.usersRepository.findOneByOrFail({ id });
      return this.usersRepository.remove(Drone);
    } catch (error) {
      console.error(error);
      return { err: 'Error encountered while attempting to delete Drone' };
    }
  }
}
