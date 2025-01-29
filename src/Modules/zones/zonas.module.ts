import { Module } from '@nestjs/common';
import { ZonasController } from './zonas.controller';
import { ZonasService } from './zonas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Zonas from '../../entities/zonas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Zonas])],
  controllers: [ZonasController],
  providers: [ZonasService],
  exports: [ZonasService],
})
export class ZonasModule {}