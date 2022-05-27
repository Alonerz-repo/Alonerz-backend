import { Chat } from 'src/chat/chat.entity';
import { SelectedChatDto } from './selected-chat.dto';

export class SelectedChatsDto {
  roomId: string;
  chats: SelectedChatDto[];

  constructor(roomId: string, chats: Chat[]) {
    this.roomId = roomId;
    this.chats = chats.map((chat) => new SelectedChatDto(chat));
  }
}
