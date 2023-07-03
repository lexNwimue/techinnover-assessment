import { Module } from '@nestjs/common';
import { DronesService } from './services/drone.service';
import { DronesController } from './controller/drones.controller';
import { Drone } from './drone.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Drone])],
  controllers: [DronesController],
  providers: [DronesService],
  exports: [DronesService],
})
export class DronesModule {}
