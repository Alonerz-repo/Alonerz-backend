import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Payload } from 'src/common/interface';
import { ChatRoomService } from './chatroom.service';
import { CreateChatRoomDto } from './dto/create-chatroom.dto';

// 테스트용 API
// 서비스 구현 시 테스트하기 위한 컨트롤러
// 나중에 삭제할거임
@ApiTags('사용 금지 : 소켓 테스트용 API 입니다.')
@Controller('chatrooms')
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  async getChatRooms(@Req() req: Request) {
    const { userId } = req.user as Payload;
    //return await this.chatRoomService.getChatRooms(userId);
  }

  @Post()
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  async createChatRoom(
    @Req() req: Request,
    @Body() createChatRoomDto: CreateChatRoomDto,
  ) {
    const { userId } = req.user as Payload;
    //return await this.chatRoomService.createChatRoom(userId, createChatRoomDto);
  }
}
