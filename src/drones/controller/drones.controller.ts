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
import { ValidationPipe } from '../validation.pipe';

@Controller('drones')
export class DronesController {
  constructor(private readonly droneService: DronesService) {}

  @Post()
  async register(
    @Body(new ValidationPipe()) registerDroneDto: RegisterDroneDto,
  ): Promise<Drone | { error: string }> {
    if (!(registerDroneDto.model in DroneModelEnum)) {
      return { error: 'Invalid Model' };
    }
    if (registerDroneDto.model)
      return this.droneService.create(registerDroneDto);
  }

  @Get()
  findAll(): Promise<Drone[]> {
    return this.droneService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Query('status') status: string,
  ): Promise<Drone | object> {
    if (typeof status === 'string') {
      return this.droneService.findOne(id, status as DroneStatusEnum);
    }
    return this.droneService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.droneService.remove(id);
  }
}
