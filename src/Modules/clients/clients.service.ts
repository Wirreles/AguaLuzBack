import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
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
    try {
      // Validación previa (opcional)
      if (!clienteData.nombre || !clienteData.telefono) {
        throw new BadRequestException(
          'El nombre y el teléfono son obligatorios.',
        );
      }

      const cliente = this.clientesRepository.create(clienteData);
      return await this.clientesRepository.save(cliente);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; // Lanza BadRequestException si es una validación.
      }
      // Lanza una excepción interna para otros errores.
      throw new InternalServerErrorException(
        'Ocurrió un error al crear el cliente. Verifica los datos ingresados.',
      );
    }
  }

  async updateCliente(
    id: string,
    clienteData: Partial<Clientes>,
  ): Promise<Clientes> {
    try {
      const cliente = await this.getClienteById(id);
      Object.assign(cliente, clienteData);
      return await this.clientesRepository.save(cliente);
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocurrió un error al actualizar el cliente. Verifica los datos ingresados.',
      );
    }
  }

  async deleteCliente(id: string): Promise<void> {
    try {
      const cliente = await this.getClienteById(id);
      await this.clientesRepository.remove(cliente);
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocurrió un error al eliminar el cliente. Verifica el ID proporcionado.',
      );
    }
  }
}
