import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientRepository } from './client.repository';
import { CreateClientDto } from './dto/request/create-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientRepository)
    private clientRepository: ClientRepository,
  ) {}

  // 사용자 소켓ID 조회
  private async getOneBySocketId(socketId: string) {
    const socket = await this.clientRepository.findOneBySocketId(socketId);
    if (!socket) {
      //throw ;
    }
    return socket;
  }

  // 사용자 소켓 정보 저장
  async connect(socketId: string, createClientDto: CreateClientDto) {
    return await this.clientRepository.connect(socketId, createClientDto);
  }

  // 사용자 소켓 정보 삭제
  async disConnect(socketId: string) {
    await this.getOneBySocketId(socketId);
    return await this.clientRepository.disConnect(socketId);
  }
}
