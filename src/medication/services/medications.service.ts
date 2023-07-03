import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medication } from '../medications.entity';
import { Repository } from 'typeorm';
import { CreateMedicationDto } from '../dto/medication.dto';

@Injectable()
export class MedicationsService {
  constructor(
    @InjectRepository(Medication)
    private medicationsRepository: Repository<Medication>,
  ) {}

  create(addMedication: CreateMedicationDto): Promise<Medication> {
    const newMedication = this.medicationsRepository.create(addMedication);
    return this.medicationsRepository.save(newMedication);
  }

  findAll(): Promise<Medication[]> {
    return this.medicationsRepository.find();
  }

  async findOne(id: string): Promise<Medication | { failed: string }> {
    return this.medicationsRepository
      .findOneByOrFail({
        id,
      })
      .catch((err) => {
        console.error(err);
        return { failed: 'There was an error finding the Drone....' };
      });
  }

  async remove(id: string): Promise<Medication | object> {
    try {
      const Drone = await this.medicationsRepository.findOneByOrFail({ id });
      return this.medicationsRepository.remove(Drone);
    } catch (error) {
      console.error(error);
      return { err: 'Error encountered while attempting to delete Drone' };
    }
  }

  async loadDrone(id: string): Promise<Medication | object> {
    try {
      const Drone = await this.medicationsRepository.findOneByOrFail({ id });
      return this.medicationsRepository.remove(Drone);
    } catch (error) {
      console.error(error);
      return { err: 'Error encountered while attempting to delete Drone' };
    }
  }

  async checkBatteryLevel(id: string): Promise<Medication | object> {
    try {
      const Drone = await this.medicationsRepository.findOneByOrFail({ id });
      return this.medicationsRepository.remove(Drone);
    } catch (error) {
      console.error(error);
      return { err: 'Error encountered while attempting to delete Drone' };
    }
  }
}
