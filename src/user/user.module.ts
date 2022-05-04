import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { UserException } from './exceptions/user.exception';
import { CareerRepository } from './repositories/career.repository';
import { CareerException } from './exceptions/career.exception';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, CareerRepository])],
  providers: [UserService, UserException, CareerException],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
