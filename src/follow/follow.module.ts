import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthException } from 'src/auth/auth.exception';
import { UserRepository } from 'src/user/user.repository';
import { FollowController } from './follow.controller';
import { FollowException } from './follow.exception';
import { FollowRepository } from './follow.repository';
import { FollowService } from './follow.service';

@Module({
  imports: [
    AuthException,
    TypeOrmModule.forFeature([FollowRepository, UserRepository]),
  ],
  controllers: [FollowController],
  providers: [FollowService, AuthException, FollowException],
})
export class FollowModule {}
