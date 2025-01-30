import { Module } from '@nestjs/common';
import { RealtimeGateway } from './realtime.gateway';

@Module({
  providers: [RealtimeGateway], // Registra el gateway como proveedor
  exports: [RealtimeGateway],   // Exporta para que otros módulos puedan usarlo
})
export class RealtimeModule {}
