import { IsNumberString, IsString } from 'class-validator';

export class CreateMedicationDto {
  @IsString()
  name: string;

  @IsNumberString()
  weight: number;

  @IsString()
  code: string;

  @IsString()
  image: string;
}
