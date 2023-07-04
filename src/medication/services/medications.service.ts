import { ConflictException, Injectable } from '@nestjs/common';
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

  async addMedication(addMedication: CreateMedicationDto): Promise<Medication> {
    // Since we're using the medication code name as the uploaded image name,
    // we could as well just eliminate storing an image field in the db
    // because its just redundant. But for semantic simplicity
    // we'd continue with that approach
    try {
      const isPresentAlready = await this.medicationsRepository.findOneBy({
        code: addMedication.code,
      });
      if (isPresentAlready) {
        throw new ConflictException('Medication Code already exists');
      }
      addMedication.image = addMedication.code;
      const newMedication = this.medicationsRepository.create(addMedication);
      return this.medicationsRepository.save(newMedication);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  findAll(): Promise<Medication[]> {
    return this.medicationsRepository.find();
  }

  async findOne(id: string): Promise<Medication | { failed: string }> {
    try {
      return this.medicationsRepository.findOneByOrFail({
        id,
      });
    } catch (error) {
      console.error(error);
      return { failed: 'There was an error finding the Drone....' };
    }
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
}
