import { Module } from '@nestjs/common';
import { DronesService } from './services/drone.service';
import { DronesController } from './controller/drones.controller';
import { Drone } from './drone.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationsModule } from 'src/medication/medications.module';

@Module({
  imports: [MedicationsModule, TypeOrmModule.forFeature([Drone])],
  controllers: [DronesController],
  providers: [DronesService],
  exports: [DronesService],
})
export class DronesModule {}
