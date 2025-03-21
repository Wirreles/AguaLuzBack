import { Module } from '@nestjs/common';
import { PedidosController } from './pedidos.controller';
import { PedidosService } from './pedidos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Pedidos from 'src/entities/pedidos.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Pedidos])],
  controllers: [PedidosController],
  providers: [PedidosService],
})
export class PedidosModule {}
