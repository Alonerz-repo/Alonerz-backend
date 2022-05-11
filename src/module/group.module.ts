import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from 'src/entity/group.entity';
import { User } from 'src/entity/user.entity';
import { GroupController } from '../controller/group.controller';
import { GroupService } from '../service/group.service';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User])],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
