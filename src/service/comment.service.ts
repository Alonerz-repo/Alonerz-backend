import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from 'src/dto/comment.dto';
import { CommentRepository } from 'src/repository/comment.repository';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository,
  ) {}

  async createGroupComment(userId: number, createCommentDto: CreateCommentDto) {
    return;
  }
}
