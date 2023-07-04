import { Module } from '@nestjs/common';
import { MedicationsService } from './services/medications.service';
import { MedicationsController } from './controllers/medications.controller';
import { Medication } from './medications.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medication]),
    MulterModule.register({
      dest: './upload', // Destination folder for uploaded files
    }),
  ],
  controllers: [MedicationsController],
  providers: [MedicationsService],
  exports: [MedicationsService],
})
export class MedicationsModule {}
