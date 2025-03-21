import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import Pedidos from '../../entities/pedidos.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {
    console.log('PedidosController inicializado.');
  }

  @Get()
  async getPedidos(): Promise<Pedidos[]> {
    return this.pedidosService.getPedidos();
  }

  @Get(':id')
  async getPedidoById(@Param('id') id: string): Promise<Pedidos> {
    return this.pedidosService.getPedidoById(id);
  }

  @Post()
  async createPedido(@Body() pedidoData: Partial<Pedidos>): Promise<Pedidos> {
    return this.pedidosService.createPedido(pedidoData);
  }

  @Put(':id')
  async updatePedido(
    @Param('id') id: string,
    @Body() pedidoData: Partial<Pedidos>,
  ): Promise<Pedidos> {
    return this.pedidosService.updatePedido(id, pedidoData);
  }

  @Delete(':id')
  async deletePedido(@Param('id') id: string): Promise<void> {
    return this.pedidosService.deletePedido(id);
  }
}
