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
  UploadedFile,
} from '@nestjs/common';
import { MedicationsService } from '../services/medications.service';
import { CreateMedicationDto } from '../dto/medication.dto';
import { Medication } from '../medications.entity';
import { ParseImagePipe } from '../utils/validation.pipe';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  async addMedication(
    @Body() createMedicationDto: CreateMedicationDto,
    @UploadedFile(new ParseImagePipe()) file: Express.Multer.File,
  ) {
    console.log(createMedicationDto, file);
    let pattern = /^[a-zA-Z0-9_-]+$/; //only letters, hyphen, underscore in name
    if (!pattern.test(createMedicationDto.name)) {
      return { error: 'Medication Name contains invalid character(s)' };
    }

    pattern = /^[A-Z0-9_]+$/; //only uppercase letters, numbers, and underscore

    if (!pattern.test(createMedicationDto.code)) {
      return { error: 'Medication Code contains invalid character(s)' };
    }
    console.log(createMedicationDto, file.buffer.toString());

    return this.medicationsService.addMedication(createMedicationDto);
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
