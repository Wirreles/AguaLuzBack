import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ClientesService } from './clients.service';
import Clientes from '../../entities/clientes.entity';


import { ApiTags } from '@nestjs/swagger';

@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  async getClientes(): Promise<Clientes[]> {
    return this.clientesService.getClientes();
  }

  @Get(':id')
  async getClienteById(@Param('id') id: string): Promise<Clientes> {
    return this.clientesService.getClienteById(id);
  }

  @Post()
  async createCliente(@Body() clienteData: Partial<Clientes>): Promise<Clientes> {
    return this.clientesService.createCliente(clienteData);
  }

  @Put(':id')
  async updateCliente(
    @Param('id') id: string,
    @Body() clienteData: Partial<Clientes>,
  ): Promise<Clientes> {
    return this.clientesService.updateCliente(id, clienteData);
  }

  @Delete(':id')
  async deleteCliente(@Param('id') id: string): Promise<void> {
    return this.clientesService.deleteCliente(id);
  }
}
