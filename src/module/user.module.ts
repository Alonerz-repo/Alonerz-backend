import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controller/user.controller';
import { UserPoint } from 'src/entity/user-point.entity';
import { BlockRepository } from 'src/repository/block.repository';
import { FollowRepository } from 'src/repository/follow.repository';
import { UserRepository } from 'src/repository/user.repository';
import { UserService } from 'src/service/user.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      UserRepository,
      FollowRepository,
      BlockRepository,
      UserPoint,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
