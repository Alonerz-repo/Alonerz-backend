import { ApiResponseProperty } from '@nestjs/swagger';
import { Chat } from 'src/chat/chat.entity';
import { SelectedChatDto } from './selected-chat.dto';

export class SelectedChatsDto {
  @ApiResponseProperty()
  chats: SelectedChatDto[];

  constructor(chats: Chat[]) {
    this.chats = chats.map((chat) => new SelectedChatDto(chat));
  }
}
