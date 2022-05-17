import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthException } from 'src/auth/auth.exception';
import { BlockRepository } from 'src/block/block.repository';
import { FollowRepository } from 'src/follow/follow.repository';
import { ImageRepository } from 'src/image/image.repository';
import { UserController } from './user.controller';
import { UserException } from './user.exception';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    ConfigModule,
    AuthException,
    TypeOrmModule.forFeature([
      UserRepository,
      FollowRepository,
      BlockRepository,
      ImageRepository,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserException, AuthException],
  exports: [UserService],
})
export class UserModule {}
