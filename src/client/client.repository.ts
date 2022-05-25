import { EntityRepository, Repository } from 'typeorm';
import { Client } from './client.entity';
import { CreateClientDto } from './dto/request/create-client.dto';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  // 사용자 소켓 정보 확인
  async findOneBySocketId(socketId: string) {
    return await this.findOne({ socketId });
  }

  // 사용자 소켓 정보 저장
  async connect(socketId: string, createClientDto: CreateClientDto) {
    return await this.save({ socketId, createClientDto });
  }

  // 사용자 소켓 정보 삭제
  async disConnect(socketId: string) {
    await this.delete({ socketId });
  }
}
