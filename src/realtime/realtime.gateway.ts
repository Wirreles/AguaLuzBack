import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class RealtimeGateway {
  @WebSocketServer()
  server: Server;

  // Mapeo de usuarios y sus sockets
  private userSockets: Map<string, string> = new Map();

  // Registrar usuarios al conectarse
  handleConnection(client: Socket) {
    console.log('Cliente conectado:', client.id);
  }

  // Manejar desconexión
  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado:', client.id);
    this.userSockets.forEach((socketId, userId) => {
      if (socketId === client.id) {
        this.userSockets.delete(userId);
      }
    });
  }

  // Registrar usuarios con su ID único
  @SubscribeMessage('registerUser')
  registerUser(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket): void {
    this.userSockets.set(data.userId, client.id);
    console.log('Usuario registrado:', data.userId, 'Socket:', client.id);
  }

  // Manejar actualizaciones de ubicación
  @SubscribeMessage('updateLocation')
  handleLocationUpdate(
    @MessageBody() locationData: { userId: string; lat: number; lng: number },
    @ConnectedSocket() client: Socket,
  ): void {
    console.log('Ubicación actualizada por:', locationData.userId, locationData);

    // Reenviar la ubicación a todos los clientes que necesitan recibirla
    this.server.emit('locationUpdate', locationData);
  }
}
