import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Clientes from '../../entities/clientes.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Clientes)
    private readonly clientesRepository: Repository<Clientes>,
  ) {}

  async getClientes(): Promise<Clientes[]> {
    const clientes = await this.clientesRepository.find({
      relations: ['zona', 'pedidos', 'llamadas'],
    });
    if (clientes.length === 0) {
      throw new NotFoundException('No hay clientes registrados.');
    }
    return clientes;
  }

  async getClienteById(id: string): Promise<Clientes> {
    const cliente = await this.clientesRepository.findOne({
      where: { idCliente: id },
      relations: ['zona', 'pedidos', 'llamadas'],
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado.`);
    }
    return cliente;
  }

  async createCliente(clienteData: Partial<Clientes>): Promise<Clientes> {
    const cliente = this.clientesRepository.create(clienteData);
    return this.clientesRepository.save(cliente);
  }

  async updateCliente(
    id: string,
    clienteData: Partial<Clientes>,
  ): Promise<Clientes> {
    const cliente = await this.getClienteById(id);
    Object.assign(cliente, clienteData);
    return this.clientesRepository.save(cliente);
  }

  async deleteCliente(id: string): Promise<void> {
    const cliente = await this.getClienteById(id);
    await this.clientesRepository.remove(cliente);
  }
}
