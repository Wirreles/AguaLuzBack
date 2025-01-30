import { RealtimeModule } from '../../realtime/realtime.module'; // Import correcto
import { Module } from '@nestjs/common';
import { RepartidoresController } from './repartidores.controller';
import { RepartidoresService } from './repartidores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Repartidores from '../../entities/repartidores.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Repartidores]),
    RealtimeModule, // Ahora está en el lugar correcto
  ],
  controllers: [RepartidoresController],
  providers: [RepartidoresService],
})
export class RepartidoresModule {}
