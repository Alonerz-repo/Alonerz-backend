import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthException } from 'src/auth/auth.exception';
import { GroupUserRepository } from '../groupuser/groupuser.repository';
import { GroupController } from './group.controller';
import { GroupException } from './group.exception';
import { GroupRepository } from './group.repository';
import { GroupService } from './group.service';
import { ImageRepository } from 'src/image/image.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GroupRepository,
      GroupUserRepository,
      ImageRepository,
    ]),
    AuthException,
  ],
  controllers: [GroupController],
  providers: [GroupService, GroupException, AuthException],
})
export class GroupModule {}
