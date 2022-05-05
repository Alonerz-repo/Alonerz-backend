import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupController } from './group.controller';
import { GroupException } from './group.exception';
import { GroupService } from './group.service';
import { GroupRepository } from './repositories/group.repository';
import { GuestRepository } from './repositories/guest.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GroupRepository, GuestRepository])],
  providers: [GroupService, GroupException],
  controllers: [GroupController],
  exports: [],
})
export class GroupModule {}
