import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConnectDto } from './dto/auth-connect.dto';
import { EVENT } from './socket.event';

@WebSocketGateway({
  cors: { origin: '*', credentials: true },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  afterInit = async (server: Server) => server;
  handleConnection = async (client: Socket) => client;
  handleDisconnect = async (client: Socket) => client;

  @SubscribeMessage(EVENT.on.CONNECT)
  async onConnect(
    @MessageBody() connectDto: ConnectDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { userId } = connectDto;
    console.log(userId);
    return client;
  }
}
