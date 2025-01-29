import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })  
export class RealtimeGateway {
  @WebSocketServer()
  server: Server;

  // Escucha el evento 'mensaje' que envían los clientes
  @SubscribeMessage('mensaje')
  handleMessage(@MessageBody() data: any): void {
    console.log('Mensaje recibido:', data);
    this.server.emit('mensaje', data); // Reenvía el mensaje a todos los clientes conectados
  }

  // Método para enviar eventos desde otros servicios
  sendUpdate(event: string, data: any) {
    this.server.emit(event, data);
  }
}
