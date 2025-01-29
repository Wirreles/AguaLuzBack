import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RepartidoresService } from './repartidores.service';
import Repartidores from '../../entities/repartidores.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('repartidores')
@Controller('repartidores')
export class RepartidoresController {
  constructor(private readonly repartidoresService: RepartidoresService) {}

  @Get()
  async getRepartidores(): Promise<Repartidores[]> {
    return this.repartidoresService.getRepartidores();
  }

  @Get(':id')
  async getRepartidorById(@Param('id') id: string): Promise<Repartidores> {
    return this.repartidoresService.getRepartidorById(id);
  }

  @Post()
  async createRepartidor(@Body() repartidorData: Partial<Repartidores>): Promise<Repartidores> {
    return this.repartidoresService.createRepartidor(repartidorData);
  }

  @Put(':id')
  async updateRepartidor(
    @Param('id') id: string,
    @Body() repartidorData: Partial<Repartidores>,
  ): Promise<Repartidores> {
    return this.repartidoresService.updateRepartidor(id, repartidorData);
  }

  @Delete(':id')
  async deleteRepartidor(@Param('id') id: string): Promise<void> {
    return this.repartidoresService.deleteRepartidor(id);
  }
}