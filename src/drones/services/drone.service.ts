import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDroneDto } from '../dto/register-drone-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Drone } from '../drone.entity';
import { In, Repository } from 'typeorm';
import { DroneStatusEnum } from '../utils/enums';
import { Medication } from 'src/medication/medications.entity';
import { MedicationsService } from 'src/medication/services/medications.service';

@Injectable()
export class DronesService {
  constructor(
    @InjectRepository(Drone)
    private readonly dronesRepository: Repository<Drone>,
    @Inject(MedicationsService)
    private readonly medicationsService: MedicationsService,
  ) {}

  create(registerDrone: RegisterDroneDto): Promise<Drone> {
    const newDrone = this.dronesRepository.create(registerDrone);
    return this.dronesRepository.save(newDrone);
  }

  findAll(status?: string): Promise<Drone[]> {
    if (status) {
      return this.dronesRepository.findBy({ status });
    }
    return this.dronesRepository.find();
  }

  async findOne(serialNumber: string): Promise<Drone | { failed: string }> {
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
      throw new InternalServerErrorException(
        'Encountered some error while deleting drone.',
      );
    }
  }

  async loadDroneWithMedication(
    serialNumber: string,
    medicationID: string,
  ): Promise<Drone> {
    try {
      const drone = await this.dronesRepository.findOneBy({
        serialNumber,
      });
      if (!drone)
        throw new NotFoundException('Drone with specified ID not found');
      const medication = await this.medicationsService.findOne(medicationID);
      if (drone.batteryPercentage < 25) {
        throw new ForbiddenException('Drone battery percentage too low');
      }
      const originalDroneStatus = drone.status;
      drone.status = 'loading' as DroneStatusEnum;
      await this.dronesRepository.save(drone);
      if (!(medication instanceof Medication)) {
        drone.status = originalDroneStatus;
        await this.dronesRepository.save(drone);
        throw new NotFoundException('Medication with specified ID not found');
      }

      if (drone.currentWeight + (medication as Medication).weight > 500) {
        drone.status = originalDroneStatus;
        await this.dronesRepository.save(drone);
        throw new ForbiddenException(
          'Max weight exceeded. Please find a lighter medication.',
        );
      }

      // All checks passed. Add Medication
      drone.medications = [...drone.medications, medication];
      drone.currentWeight += drone.currentWeight + medication.weight;
      drone.status = 'loaded' as DroneStatusEnum;
      return this.dronesRepository.save(drone);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async checkBatteryLevel(serialNumber: string): Promise<Drone | object> {
    try {
      const drone = await this.dronesRepository.findOneByOrFail({
        serialNumber,
      });
      if (!drone) {
        throw new NotFoundException('Drone not found');
      }
      return { batteryPercentage: drone.batteryPercentage };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async checkLoadedMedication(serialNumber: string): Promise<Drone | object> {
    try {
      const drone = await this.dronesRepository.findOneByOrFail({
        serialNumber,
      });
      if (!drone) {
        throw new NotFoundException('Drone not found');
      }
      return { loadedMedications: drone.medications };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAvailableDronesForLoading(): Promise<Drone[]> {
    try {
      return this.dronesRepository.findBy({
        status: In(['idle', 'returning', 'delivered']),
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
