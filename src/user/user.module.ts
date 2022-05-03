import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserException } from './user.exception';
import { CareerRepository } from './career.repository';
import { CareerException } from './career.exception';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, CareerRepository])],
  providers: [UserService, UserException, CareerException],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
