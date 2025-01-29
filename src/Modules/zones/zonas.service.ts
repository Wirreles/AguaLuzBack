import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Zonas from '../../entities/zonas.entity';

@Injectable()
export class ZonasService {
  constructor(
    @InjectRepository(Zonas)
    private readonly zonasRepository: Repository<Zonas>,
  ) {}

  async getZonas(): Promise<Zonas[]> {
    const zonas = await this.zonasRepository.find({
      relations: ['clientes', 'pedidos'],
    });
    if (zonas.length === 0) {
      throw new NotFoundException('No hay zonas registradas.');
    }
    return zonas;
  }

  async getZonaById(id: string): Promise<Zonas> {
    const zona = await this.zonasRepository.findOne({
      where: { idZona: id },
      relations: ['clientes', 'pedidos'],
    });
    if (!zona) {
      throw new NotFoundException(`Zona con ID ${id} no encontrada.`);
    }
    return zona;
  }

  async createZona(zonaData: Partial<Zonas>): Promise<Zonas> {
    const zona = this.zonasRepository.create(zonaData);
    return this.zonasRepository.save(zona);
  }

  async updateZona(
    id: string,
    zonaData: Partial<Zonas>,
  ): Promise<Zonas> {
    const zona = await this.getZonaById(id);
    Object.assign(zona, zonaData);
    return this.zonasRepository.save(zona);
  }

  async deleteZona(id: string): Promise<void> {
    const zona = await this.getZonaById(id);
    await this.zonasRepository.remove(zona);
  }
}