import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Payload } from 'src/common/interface';
import { ChatRoomService } from './chatroom.service';
import { ChatRoomSwagger } from './chatroom.swagger';
import { CreateChatRoomDto } from './dto/create-chatroom.dto';

@ApiTags(ChatRoomSwagger.tag)
@Controller('chatrooms')
export class ChatRoomController {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(ChatRoomSwagger.routes.getChatRooms)
  @ApiResponse(ChatRoomSwagger.response.getChatRooms[200])
  @ApiResponse(ChatRoomSwagger.response.getChatRooms[401])
  async getChatRooms(@Req() req: Request) {
    const { userId } = req.user as Payload;
    return await this.chatRoomService.getChatRooms(userId);
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(ChatRoomSwagger.routes.createChatRoom)
  @ApiResponse(ChatRoomSwagger.response.createChatRoom[201])
  @ApiResponse(ChatRoomSwagger.response.createChatRoom[401])
  async createChatRoom(
    @Req() req: Request,
    @Body() createChatRoomDto: CreateChatRoomDto,
  ) {
    const { userId } = req.user as Payload;
    return await this.chatRoomService.createChatRoom(userId, createChatRoomDto);
  }
}
