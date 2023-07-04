import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

@Injectable()
export class ParseImagePipe implements PipeTransform {
  constructor() {}

  transform(): any {
    const options: MulterOptions = {
      fileFilter: (req, file, callback) => {
        const allowedMimeTypes = ['image/jpeg', 'image/png'];
        if (allowedMimeTypes.includes(file.mimetype)) {
          callback(null, true); // Accept the file
        } else {
          callback(
            new BadRequestException(
              'Invalid file type. Only JPEG and PNG images are allowed.',
            ),
            false,
          ); // Reject the file
        }
      },
    };

    return FileInterceptor('image', options);
  }
}
