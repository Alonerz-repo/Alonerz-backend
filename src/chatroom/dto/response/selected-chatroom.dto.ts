import { ChatRoomUserDto } from './chatroom-user.dto';

export class SelectedChatRoomDto {
  roomId: string;
  user: ChatRoomUserDto;

  constructor(chatRoom: any) {
    const { room_roomId } = chatRoom;
    this.roomId = room_roomId;
    this.user = new ChatRoomUserDto(chatRoom);
  }
}
