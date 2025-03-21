import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Pedidos from 'src/entities/pedidos.entity';
import Zonas from 'src/entities/zonas.entity';
import Clientes from 'src/entities/clientes.entity';
import Productos from 'src/entities/productos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedidos, Zonas,Clientes,Productos])],
  controllers: [WebhookController],
  providers: [WebhookService], // Asegúrate de incluir el controlador aquí
})
export class WebhookModule {}
