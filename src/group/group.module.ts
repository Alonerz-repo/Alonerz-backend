import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthException } from 'src/auth/auth.exception';
import { GroupUser } from './group-user.entity';
import { GroupController } from './group.controller';
import { GroupException } from './group.exception';
import { GroupRepository } from './group.repository';
import { GroupService } from './group.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupRepository, GroupUser]),
    AuthException,
  ],
  controllers: [GroupController],
  providers: [GroupService, GroupException, AuthException],
})
export class GroupModule {}
