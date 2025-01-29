import { Module } from '@nestjs/common';
import { ClientesController } from './clients.controller';
import { ClientesService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Clientes from '../../entities/clientes.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Clientes])],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService],
})
export class ClientesModule {}
