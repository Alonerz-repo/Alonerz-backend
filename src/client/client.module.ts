import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientRepository])],
  providers: [ClientService, ClientRepository],
  exports: [ClientService],
})
export class ClientModule {}
