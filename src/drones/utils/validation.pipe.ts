import { BadRequestException } from '@nestjs/common/exceptions';
import { Drone } from '../drone.entity';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    value.weightLimit = +value?.weightLimit; // Parse numeric string weightLimit to number
    value.batteryPercentage = +value?.batteryPercentage; // Parse numeric string batteryPercentage to number

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);

    // Send all the errors encountered
    if (errors.length > 0) {
      const errorMessages = [];
      console.error(errors);
      errors.forEach((error) => {
        Object.entries(error.constraints).forEach(([key, value]) => {
          errorMessages.push(value);
        });
      });

      throw new BadRequestException(
        `Validation Error: ${errorMessages.join('. ')}`,
      );
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [
      String,
      Boolean,
      Number,
      Array,
      Object,
      Date,
      Drone,
    ];
    return !types.includes(metatype);
  }
}
