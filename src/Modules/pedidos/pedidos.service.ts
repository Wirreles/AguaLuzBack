import {
    Injectable,
    NotFoundException,
    BadRequestException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { Repository } from 'typeorm';
  import { InjectRepository } from '@nestjs/typeorm';
  import Pedidos from '../../entities/pedidos.entity';
  
  @Injectable()
  export class PedidosService {
    constructor(
      @InjectRepository(Pedidos)
      private readonly pedidosRepository: Repository<Pedidos>,
    ) {}
  
    async getPedidos(): Promise<Pedidos[]> {
      const pedidos = await this.pedidosRepository.find({
        relations: ['cliente', 'zona', 'repartidor', 'productosPedidos'],
      });
      if (pedidos.length === 0) {
        throw new NotFoundException('No hay pedidos registrados.');
      }
      return pedidos;
    }
  
    async getPedidoById(id: string): Promise<Pedidos> {
      const pedido = await this.pedidosRepository.findOne({
        where: { idPedido: id },
        relations: ['cliente', 'zona', 'repartidor', 'productosPedidos'],
      });
      if (!pedido) {
        throw new NotFoundException(`Pedido con ID ${id} no encontrado.`);
      }
      return pedido;
    }
  
    async createPedido(pedidoData: Partial<Pedidos>): Promise<Pedidos> {
      try {
        console.log('Datos recibidos en createPedido:', pedidoData);
    
        // Validar campos obligatorios
        if (!pedidoData.cliente || !pedidoData.importe || !pedidoData.productosPedidos) {
          console.error('Validación fallida en createPedido');
          throw new BadRequestException(
            'El cliente, importe y productos son obligatorios.',
          );
        }
    
        // Asegurar que el campo repartidor sea nulo si no está definido
        const pedido = this.pedidosRepository.create({
          ...pedidoData,
          repartidor: pedidoData.repartidor || null, // Manejo explícito del valor nulo
        });
    
        console.log('Pedido creado:', pedido);
    
        const savedPedido = await this.pedidosRepository.save(pedido);
        console.log('Pedido guardado:', savedPedido);
    
        return savedPedido;
      } catch (error) {
        console.error('Error en createPedido:', error.message);
    
        if (error instanceof BadRequestException) {
          throw error;
        }
    
        throw new InternalServerErrorException(
          'Ocurrió un error al crear el pedido. Verifica los datos ingresados.',
        );
      }
    }
    
    
  
    async updatePedido(id: string, pedidoData: Partial<Pedidos>): Promise<Pedidos> {
      try {
        const pedido = await this.getPedidoById(id);
        Object.assign(pedido, pedidoData);
        return await this.pedidosRepository.save(pedido);
      } catch (error) {
        throw new InternalServerErrorException(
          'Ocurrió un error al actualizar el pedido. Verifica los datos ingresados.',
        );
      }
    }
  
    async deletePedido(id: string): Promise<void> {
      try {
        const pedido = await this.getPedidoById(id);
        await this.pedidosRepository.remove(pedido);
      } catch (error) {
        throw new InternalServerErrorException(
          'Ocurrió un error al eliminar el pedido. Verifica el ID proporcionado.',
        );
      }
    }
  }
  