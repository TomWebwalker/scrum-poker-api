import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  socket: Socket;

  handleConnection(client: Socket) {
    
    this.socket = client;
  }

  handleDisconnect(client: Socket) {
    console.log(this.socket.id);
    console.log(client);
  }

  @SubscribeMessage('JOIN_ROOM')
  async joinRoom(@MessageBody() roomId: string): Promise<boolean> {
    this.socket.join(roomId);
    console.log(this.socket.id);
    return true;
  }
}
