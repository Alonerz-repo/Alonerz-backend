import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository,
  ) {}

  // 사용자 소켓ID 조회
  private async getOneBySocketId(socketId: string) {
    return await this.clientRepository.findOneBySocketId(socketId);
  }

  // 사용자 소켓 정보 저장
  async connect(userId: string, socketId: string) {
    const socket = await this.getOneBySocketId(socketId);
    if (!socket) {
      return await this.clientRepository.connect(userId, socketId);
    }
  }

  // 사용자 소켓 정보 삭제
  async disConnect(socketId: string) {
    const socket = await this.getOneBySocketId(socketId);
    if (socket) {
      return await this.clientRepository.disConnect(socketId);
    }
  }
}
