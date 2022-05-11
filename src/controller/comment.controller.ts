import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Payload } from 'src/common/interface';
import { JwtGuard } from 'src/guard/jwt.guard';
import { CommentService } from 'src/service/comment.service';
import { DeleteDateColumn } from 'typeorm';

@Controller('comments')
@ApiTags('댓글 API')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @ApiOperation({
    summary: '특정 그룹 댓글 조회 API',
    description: '특정 그룹의 댓글 목록을 조회한다.',
  })
  @Get(':groupId/comments')
  async findComments(@Param('groupId') groupId: number) {
    return;
  }

  @ApiOperation({
    summary: '특정 그룹 댓글 작성 API',
    description: '특정 그룹에 댓글을 작성한다.',
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Post(':groupId/comments')
  async createComment(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Body() createCommentDto: any,
  ) {
    const { userId } = req.user as Payload;
    return;
  }

  @ApiOperation({
    summary: '특정 그룹 댓글 수정 API',
    description: '특정 그룹의 특정 댓글을 수정한다.',
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Patch(':groupId/comments/:commentId')
  async editComment(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: any,
  ) {
    const { userId } = req.user as Payload;
    return;
  }

  @ApiOperation({
    summary: '특정 그룹 댓글 삭제 API',
    description: '특정 그룹의 특정 댓글을 삭제한다.',
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @DeleteDateColumn(':groupId/comments/:commentId')
  async deleteComment(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Param('commentId') commentId: number,
  ) {
    const { userId } = req.user as Payload;
    return;
  }

  @ApiOperation({
    summary: '특정 댓글의 하위 댓글 조회 API',
    description: '특정 댓글의 하위 댓글 목록을 조회한다.',
  })
  @Get(':groupId/comments/:parentId')
  async findChildComments(
    @Param('groupId') groupId: number,
    @Param('parentId') parentId: number,
  ) {
    return [];
  }

  @ApiOperation({
    summary: '특정 댓글의 하위 댓글 작성 API',
    description: '특정 댓글의 하위 댓글을 작성한다.',
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Post(':groupId/comments/:parentId')
  async createChildComment(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Param('parentId') parentId: number,
    @Body() createCommentDto: any,
  ) {
    const { userId } = req.user as Payload;
    return;
  }

  @ApiOperation({
    summary: '특정 댓글의 하위 댓글 수정 API',
    description: '특정 댓글의 하위 댓글을 수정한다.',
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Patch(':groupId/comments/:parentId/:commentId')
  async editChildComment(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Param('parentId') parentId: number,
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: any,
  ) {
    const { userId } = req.user as Payload;
    return;
  }

  @ApiOperation({
    summary: '특정 댓글의 하위 댓글 삭제 API',
    description: '특정 댓글의 하위 댓글을 삭제한다.',
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Delete(':groupId/comments/:parentId/:commentId')
  async deleteChildComment(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Param('parentId') parentId: number,
    @Param('commentId') commentId: number,
  ) {
    const { userId } = req.user as Payload;
    return;
  }
}
