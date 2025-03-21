import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Pedidos from '../../entities/pedidos.entity';
import Clientes from 'src/entities/clientes.entity';
import Zonas from 'src/entities/zonas.entity';
import Productos from 'src/entities/productos.entity';

@Injectable()
export class WebhookService {
  constructor(
    @InjectRepository(Pedidos)
    private readonly pedidosRepository: Repository<Pedidos>,
    @InjectRepository(Clientes)
    private readonly clientesRepository: Repository<Clientes>,
    @InjectRepository(Zonas)
    private readonly zonasRepository: Repository<Zonas>,
    @InjectRepository(Productos)
    private readonly productosRepository: Repository<Productos>,
  ) {}

  async createOrderFromMessage(clienteTelefono: string, mensaje: string): Promise<Pedidos> {
    try {
      console.log('Mensaje recibido:', mensaje);
  
      const normalizedMessage = mensaje
      .replace(/\r?\n/g, ' ') // Eliminar saltos de línea.
      .replace(/\s+/g, ' ') // Colapsar espacios.
      .normalize('NFC') // Normalizar caracteres Unicode.
      .trim(); // Eliminar espacios al inicio y final.
    
      console.log('Mensaje normalizado:', normalizedMessage);
  
      const pedidoRegex = /Nombre:\s*([\w\sáéíóúÁÉÍÓÚñÑ]+)\s+Tel[eé]fono:\s*(\d+)\s+Zona:\s*([\w\s]+)\s+Productos:\s*([\w\s,;]+)\s+Importe:\s*(\d+(\.\d{1,2})?)\s+Descuento:\s*(\d+(\.\d{1,2})?)\s+Paga con:\s*(\d+(\.\d{1,2})?)\s+Observaciones:\s*(.+)/i;

      const matches = normalizedMessage.match(pedidoRegex);
  
      if (!matches) {
        console.error('Formato del mensaje incorrecto. No coincide con el regex.');
        throw new BadRequestException('Formato del mensaje incorrecto. Verifique los campos requeridos.');
      }
  
      const [_, nombre, telefono, zona, productos, importe, , descuento, , pagaCon, , observaciones] = matches;
      console.log('Datos extraídos del mensaje:', { nombre, telefono, zona, productos, importe, descuento, pagaCon, observaciones });
  
      const cliente = await this.clientesRepository.findOne({ where: { telefono } });
      if (!cliente) {
        console.error(`Cliente no encontrado para el teléfono: ${telefono}`);
        throw new BadRequestException(`Cliente no registrado con el teléfono ${telefono}.`);
      }
      console.log('Cliente encontrado:', cliente);
  
      const zonaObj = await this.zonasRepository.findOne({ where: { zona: zona } });
      if (!zonaObj) {
        console.error(`Zona no encontrada: ${zona}`);
        throw new BadRequestException(`Zona "${zona}" no registrada.`);
      }
      console.log('Zona encontrada:', zonaObj);
      const descripcionGenerica = "Descripción pendiente";
      const productosPedidos = await Promise.all(
        productos.split(';').map(async (prod) => {
          const [productoNombre, cantidad] = prod.split(',').map((str) => str.trim());
          if (!productoNombre || isNaN(parseInt(cantidad, 10))) {
            console.error(`Producto mal formado: "${prod}".`);
            throw new BadRequestException(`Producto mal formado: "${prod}".`);
          }
  
          let producto = await this.productosRepository.findOne({ where: { nombre: productoNombre } });
          if (!producto) {
            console.warn(`Producto no encontrado, se creará uno nuevo: ${productoNombre}`);
            producto = this.productosRepository.create({
                nombre: productoNombre,
                precio: 100,
                stock: 100,
                activo: true,
                descripcion: descripcionGenerica,
                minimo: 10, // Valor predeterminado para evitar errores
                control: "valor_por_defecto", // Proporcionar un valor predeterminado para la columna control
              });   
            await this.productosRepository.save(producto);
          }
          
          console.log('Producto procesado:', { producto, cantidad });
  
          return { idProductoPedido: null, producto, cantidad: parseInt(cantidad, 10), pedido: null };
        }),
      );
  
      const pedidoData: Partial<Pedidos> = {
        cliente,
        nroPedido: Math.floor(Math.random() * 1000),
        entrada: new Date(),
        importe: parseFloat(importe),
        productosPedidos,
        zona: zonaObj,
        observaciones,
        pagaCon: parseFloat(pagaCon),
        descuento: parseFloat(descuento),
        nombre,
        enviar: null,
        salida: null,
        despachado: false,
      };
      console.log('Datos del pedido a crear:', pedidoData);
  
      const pedido = this.pedidosRepository.create(pedidoData);
      const pedidoGuardado = await this.pedidosRepository.save(pedido);
      console.log('Pedido creado exitosamente:', pedidoGuardado);
  
      return pedidoGuardado;
    } catch (error) {
      console.error('Error al procesar el pedido:', error.message);
      throw new InternalServerErrorException(`Error al procesar el pedido: ${error.message}`);
    }
  }
  
}
