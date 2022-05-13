import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthException } from 'src/auth/auth.exception';
import { CommentController } from './comment.controller';
import { CommentException } from './comment.exception';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';

@Module({
  imports: [AuthException, TypeOrmModule.forFeature([CommentRepository])],
  controllers: [CommentController],
  providers: [CommentService, CommentException, AuthException],
})
export class CommentModule {}
