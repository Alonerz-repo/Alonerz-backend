import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupUser } from 'src/entity/group-user.entity';
import { CommentRepository } from 'src/repository/comment.repository';
import { GroupRepository } from 'src/repository/group.repository';
import { GroupController } from '../controller/group.controller';
import { GroupService } from '../service/group.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupRepository, GroupUser, CommentRepository]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
