import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from 'src/controller/comment.controller';
import { CommentRepository } from 'src/repository/comment.repository';
import { CommentService } from 'src/service/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
