import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';

// 테스트용 API
// 서비스 구현 시 테스트하기 위한 컨트롤러
// 나중에 삭제할거임
@ApiTags('사용 금지 : 소켓 테스트용 API 입니다.')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getChats() {
    return [];
  }
}
