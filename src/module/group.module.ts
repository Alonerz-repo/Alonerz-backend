import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GroupController } from '../controller/group.controller';
import { GroupService } from '../service/group.service';

@Module({
  imports: [ConfigModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export class GroupModule {}
