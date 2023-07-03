import { IsString, IsInt } from 'class-validator';
import { DroneModelEnum, DroneStatusEnum } from '../utils/enums';

export class RegisterDroneDto {
  @IsString()
  @IsString()
  model: string;

  @IsInt()
  weightLimit: number;

  @IsInt()
  batteryCapacity: number;

  @IsString()
  status: string;
}
