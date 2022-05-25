import { ChatUserDto } from './chat-user.dto';

export class SelectedChatDto {
  chatId: number;
  roomId: string;
  message: string;
  createdAt: Date;
  user: ChatUserDto;

  constructor(chat: any) {
    const { chatId, roomId, message, createdAt, user } = chat;
    this.chatId = chatId;
    this.roomId = roomId;
    this.message = message;
    this.createdAt = createdAt;
    this.user = new ChatUserDto(user);
  }
}
