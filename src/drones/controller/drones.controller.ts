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
import { DronesService } from '../services/drone.service';
import { RegisterDroneDto } from '../dto/register-drone-dto';
import { Drone } from '../drone.entity';
import { DroneModelEnum, DroneStatusEnum } from '../utils/enums';
import { ValidationPipe } from '../utils/validation.pipe';

@Controller('drones')
export class DronesController {
  constructor(private readonly droneService: DronesService) {}

  @Post()
  async register(
    @Body(new ValidationPipe()) registerDroneDto: RegisterDroneDto,
  ): Promise<Drone | object> {
    console.log(registerDroneDto.model, DroneModelEnum.Middleweight);
    if (
      !Object.values(DroneModelEnum).includes(
        registerDroneDto.model as DroneModelEnum,
      )
    ) {
      return { error: 'Invalid model' };
    }
    if (
      registerDroneDto.batteryPercentage < 0 ||
      registerDroneDto.batteryPercentage > 100
    ) {
      return { error: 'Battery capacity cannot be negative' };
    }
    return {
      success: 'Drone registered successfully',
      data: await this.droneService.create(registerDroneDto),
    };
  }

  @Get()
  find(@Query('status') status: string): Promise<Drone[]> {
    // confirm the status query is defined and valid
    if (
      typeof status === 'string' &&
      !Object.values(DroneModelEnum).includes(status as DroneModelEnum)
    ) {
      return this.droneService.findAll(status);
    }
    return this.droneService.findAll();
  }

  @Get('/available')
  findAvailableDronesForLoading(): Promise<Drone[]> {
    return this.droneService.findAvailableDronesForLoading();
  }

  @Put('/load-drone')
  loadDroneWithMedication(@Body() reqBody: any): Promise<Drone> {
    return this.droneService.loadDroneWithMedication(
      reqBody.serialNumber,
      reqBody.medicationID,
    );
  }

  @Get('loaded-medications/:serialNumber')
  checkLoadedMedication(
    @Param(
      'serialNumber',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    serialNumber: string,
  ): Promise<Drone | object> {
    return this.droneService.checkLoadedMedication(serialNumber);
  }

  @Get('battery-level/:serialNumber')
  checkBatteryLevel(
    @Param(
      'serialNumber',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    serialNumber: string,
  ): Promise<Drone | object> {
    return this.droneService.checkBatteryLevel(serialNumber);
  }

  @Get('id/:serialNumber')
  findOne(
    @Param(
      'serialNumber',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    serialNumber: string,
  ): Promise<Drone | object> {
    return this.droneService.findOne(serialNumber);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.droneService.remove(id);
  }
}
