import { BadRequestException, Module } from '@nestjs/common';
import { MedicationsService } from './services/medications.service';
import { MedicationsController } from './controllers/medications.controller';
import { Medication } from './medications.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Medication]),
    MulterModule.register({
      dest: './upload', // Destination folder for uploaded files
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, './upload');
        },
        // filename: (req, file, cb) => {
        //   // save file name with medication code

        //   const pattern = /^[A-Z0-9_]+$/; //only uppercase letters, numbers, and underscore
        //   if (!pattern.test(req.body?.code)) {
        //     return new BadRequestException(
        //       'Invalid Medication Code: Only UPPERCASE, numbers, and underscore allowed',
        //     );
        //   }
        //   // Maintain file extension
        //   const fileName = `${req.body.code}.${file.mimetype.split('/')[1]}`;
        //   cb(null, req.body.code); // use code as filename
        // },
      }),
    }),
  ],
  controllers: [MedicationsController],
  providers: [MedicationsService],
  exports: [MedicationsService],
})
export class MedicationsModule {}
