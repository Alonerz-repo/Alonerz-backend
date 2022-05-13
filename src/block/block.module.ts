import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthException } from 'src/auth/auth.exception';
import { FollowRepository } from 'src/follow/follow.repository';
import { UserRepository } from 'src/user/user.repository';
import { BlockController } from './block.controller';
import { BlockException } from './block.exception';
import { BlockRepository } from './block.repository';
import { BlockService } from './block.service';

@Module({
  imports: [
    AuthException,
    TypeOrmModule.forFeature([
      BlockRepository,
      UserRepository,
      FollowRepository,
    ]),
  ],
  controllers: [BlockController],
  providers: [BlockService, AuthException, BlockException],
})
export class BlockModule {}
