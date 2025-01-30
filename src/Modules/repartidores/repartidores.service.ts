import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Repartidores from '../../entities/repartidores.entity';
import { RealtimeGateway } from 'src/realtime/realtime.gateway';


@Injectable()
export class RepartidoresService {

  constructor(
    @InjectRepository(Repartidores)
    private readonly repartidoresRepository: Repository<Repartidores>,
    private readonly realtimeGateway: RealtimeGateway,

  ) {}



  async getRepartidores(): Promise<Repartidores[]> {
     
    const repartidores = await this.repartidoresRepository.find({
      relations: ['pedidos'], 
    });
    if (repartidores.length === 0) {
   
      throw new NotFoundException('No hay repartidores registrados.');
    }
    return repartidores;
  }

  async getRepartidorById(id: string): Promise<Repartidores> {
    const repartidor = await this.repartidoresRepository.findOne({
      where: { idRepartidor: id },
      relations: ['pedidos'], // Relación con Pedidos
    });
    if (!repartidor) {
      throw new NotFoundException(`Repartidor con ID ${id} no encontrado.`);
    }
    return repartidor;
  }

  async createRepartidor(repartidorData: Partial<Repartidores>): Promise<Repartidores> {
    const repartidor = this.repartidoresRepository.create(repartidorData);
    return this.repartidoresRepository.save(repartidor);
  }

async updateRepartidor(id: string, repartidorData: any) {
    const updatedRepartidor = await this.getRepartidorById(id);
    Object.assign(updatedRepartidor, repartidorData);
    await this.repartidoresRepository.save(updatedRepartidor);

    // Notificar a los clientes en tiempo real
    this.realtimeGateway.sendUpdate('repartidor_actualizado', updatedRepartidor);

    return updatedRepartidor;
  }

  async deleteRepartidor(id: string): Promise<void> {
    
    const repartidor = await this.getRepartidorById(id);
    await this.repartidoresRepository.remove(repartidor);
  }
}