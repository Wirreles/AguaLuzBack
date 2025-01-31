import { Module } from '@nestjs/common';
import { RealtimeGateway } from './realtime.gateway';
import { RealtimeController } from './realtime.controller';

@Module({
  providers: [RealtimeGateway], // Registra el gateway como proveedor
  exports: [RealtimeGateway],   // Exporta para que otros módulos puedan usarlo
  controllers: [RealtimeController],
})
export class RealtimeModule {}
