import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controller/user.controller';
import { UserRepository } from 'src/repository/user.repository';
import { FollowRepository } from 'src/repository/follow.repository';
import { BlockRepository } from 'src/repository/block.repository';
import { UserService } from 'src/service/user.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      UserRepository,
      FollowRepository,
      BlockRepository,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
