import { IsString, IsInt, IsNumberString } from 'class-validator';
import { DroneModelEnum, DroneStatusEnum } from '../utils/enums';

export class RegisterDroneDto {
  @IsString()
  model: string;

  @IsNumberString()
  batteryPercentage: number;
}
