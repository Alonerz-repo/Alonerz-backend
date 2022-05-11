import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/common/configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from 'src/controller/comment.controller';
import { CommentRepository } from 'src/repository/comment.repository';
import { CommentService } from 'src/service/comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository]),
    JwtModule.register(jwtConfig),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
