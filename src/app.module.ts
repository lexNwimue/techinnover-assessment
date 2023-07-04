import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Drone } from './drones/drone.entity';
import { Medication } from './medication/medications.entity';
import { MedicationsModule } from './medication/medications.module';
import { DronesModule } from './drones/drone.module';

@Module({
  imports: [
    MedicationsModule,
    DronesModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'sqlite',
        database: './src/db/db.sqlite',
        entities: [Drone, Medication],
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
