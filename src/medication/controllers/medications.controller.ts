import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { MedicationsService } from '../services/medications.service';
import { CreateMedicationDto } from '../dto/medication.dto';
import { Medication } from '../medications.entity';

@Controller('medication')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  add(@Body() CreateMedicationDto: CreateMedicationDto): Promise<Medication> {
    return this.medicationsService.create(CreateMedicationDto);
  }

  @Get()
  findAll(): Promise<Medication[]> {
    return this.medicationsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<Medication | object> {
    if (typeof status === 'string') {
      return this.medicationsService.findOne(id);
    }
    return this.medicationsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicationsService.remove(id);
  }
}
