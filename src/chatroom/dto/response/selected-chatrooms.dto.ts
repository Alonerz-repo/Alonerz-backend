import { ChatRoom } from 'src/chatroom/chatroom.entity';
import { SelectedChatRoomDto } from './selected-chatroom.dto';

export class SelectedChatRoomsDto {
  chatRooms: SelectedChatRoomDto[];

  constructor(chatRooms: ChatRoom[]) {
    this.chatRooms = chatRooms.map(
      (chatroom) => new SelectedChatRoomDto(chatroom),
    );
  }
}
