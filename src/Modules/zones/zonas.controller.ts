import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ZonasService } from './zonas.service';
import Zonas from '../../entities/zonas.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('zonas')
@Controller('zonas')
export class ZonasController {
  constructor(private readonly zonasService: ZonasService) {}

  @Get()
  async getZonas(): Promise<Zonas[]> {
    return this.zonasService.getZonas();
  }

  @Get(':id')
  async getZonaById(@Param('id') id: string): Promise<Zonas> {
    return this.zonasService.getZonaById(id);
  }

  @Post()
  async createZona(@Body() zonaData: Partial<Zonas>): Promise<Zonas> {
    return this.zonasService.createZona(zonaData);
  }

  @Put(':id')
  async updateZona(
    @Param('id') id: string,
    @Body() zonaData: Partial<Zonas>,
  ): Promise<Zonas> {
    return this.zonasService.updateZona(id, zonaData);
  }

  @Delete(':id')
  async deleteZona(@Param('id') id: string): Promise<void> {
    return this.zonasService.deleteZona(id);
  }
}