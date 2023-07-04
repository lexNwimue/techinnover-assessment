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
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UseInterceptors,
} from '@nestjs/common';
import { MedicationsService } from '../services/medications.service';
import { CreateMedicationDto } from '../dto/medication.dto';
import { Medication } from '../medications.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async addMedication(
    @Body() createMedicationDto: CreateMedicationDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|gif)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 100 }), //100MB max. Can't live an unbounded file size
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    try {
      let pattern = /^[a-zA-Z0-9_-]+$/; //only letters, hyphen, underscore in name
      if (!pattern.test(createMedicationDto.name)) {
        return { error: 'Medication Name contains invalid character(s)' };
      }

      pattern = /^[A-Z0-9_]+$/; //only UPPERCASE letters, numbers and underscore in code
      if (!pattern.test(createMedicationDto.code)) {
        return { error: 'Medication Code contains invalid character(s)' };
      }

      // Handle the file and save it with the medication code
      const fileName = `${createMedicationDto.code}.${
        file.mimetype.split('/')[1]
      }`;
      const filePath = `./upload/${fileName}`;
      console.log(file);

      // Save the file
      fs.writeFileSync(filePath, file.path);

      return this.medicationsService.addMedication(createMedicationDto);
    } catch (error) {
      return { error: error.message };
    }
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
