import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatRepository } from './chat.repository';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRepository)
    private readonly chatRepository: ChatRepository,
  ) {}
}
