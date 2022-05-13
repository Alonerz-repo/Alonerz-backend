import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Payload } from 'src/common/interface';
import { CommentService } from './comment.service';
import { CommentSwagger } from './comment.swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags(CommentSwagger.tag)
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 그룹 댓글 조회
  @Get()
  @ApiQuery(CommentSwagger.query.groupId)
  @ApiQuery(CommentSwagger.query.offset)
  @ApiOperation(CommentSwagger.routes.getGroupComments)
  @ApiResponse(CommentSwagger.response.getGroupComments[200])
  @ApiResponse(CommentSwagger.response.getGroupComments[404])
  async getGroupComments(
    @Query('groupId') groupId: number,
    @Query('offset') offset: number,
  ) {
    return await this.commentService.getGroupComments(groupId, offset);
  }

  // 그룹 댓글 작성
  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiQuery(CommentSwagger.query.groupId)
  @ApiOperation(CommentSwagger.routes.creteGroupComment)
  @ApiResponse(CommentSwagger.response.creteGroupComment[201])
  @ApiResponse(CommentSwagger.response.creteGroupComment[400])
  @ApiResponse(CommentSwagger.response.creteGroupComment[401])
  @ApiResponse(CommentSwagger.response.creteGroupComment[404])
  async creteGroupComment(
    @Req() req: Request,
    @Query('groupId') groupId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const { userId } = req.user as Payload;
    return await this.commentService.createGroupComment(
      groupId,
      userId,
      createCommentDto,
    );
  }

  // 하위 댓글 조회
  @Get(':parentId')
  @ApiQuery(CommentSwagger.query.groupId)
  @ApiQuery(CommentSwagger.query.offset)
  @ApiParam(CommentSwagger.param.parentId)
  @ApiOperation(CommentSwagger.routes.getChildComments)
  @ApiResponse(CommentSwagger.response.getChildComments[200])
  @ApiResponse(CommentSwagger.response.getChildComments[404])
  async getChildComments(
    @Param('parentId') parentId: number,
    @Query('groupId') groupId: number,
    @Query('offset') offset: number,
  ) {
    return await this.commentService.getChildComments(
      groupId,
      parentId,
      offset,
    );
  }

  // 하위 댓글 작성
  @Post(':parentId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiQuery(CommentSwagger.query.groupId)
  @ApiParam(CommentSwagger.param.parentId)
  @ApiOperation(CommentSwagger.routes.createChildComment)
  @ApiResponse(CommentSwagger.response.createChildComment[201])
  @ApiResponse(CommentSwagger.response.createChildComment[400])
  @ApiResponse(CommentSwagger.response.createChildComment[401])
  @ApiResponse(CommentSwagger.response.createChildComment[404])
  async createChildComment(
    @Req() req: Request,
    @Param('parentId') parentId: number,
    @Query('groupId') groupId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const { userId } = req.user as Payload;
    return await this.commentService.createChildComment(
      groupId,
      parentId,
      userId,
      createCommentDto,
    );
  }

  // 댓글 수정
  @Patch(':commentId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiParam(CommentSwagger.param.commentId)
  @ApiOperation(CommentSwagger.routes.updateComment)
  @ApiResponse(CommentSwagger.response.updateComment[200])
  @ApiResponse(CommentSwagger.response.updateComment[400])
  @ApiResponse(CommentSwagger.response.updateComment[401])
  @ApiResponse(CommentSwagger.response.updateComment[403])
  @ApiResponse(CommentSwagger.response.updateComment[404])
  async updateComment(
    @Req() req: Request,
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const { userId } = req.user as Payload;
    return await this.commentService.updateComment(
      userId,
      commentId,
      updateCommentDto,
    );
  }

  // 댓글 삭제
  @Delete(':commentId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiParam(CommentSwagger.param.commentId)
  @ApiOperation(CommentSwagger.routes.deleteComment)
  @ApiResponse(CommentSwagger.response.deleteComment[200])
  @ApiResponse(CommentSwagger.response.deleteComment[401])
  @ApiResponse(CommentSwagger.response.deleteComment[403])
  @ApiResponse(CommentSwagger.response.deleteComment[404])
  async deleteComment(
    @Req() req: Request,
    @Param('commentId') commentId: number,
  ) {
    const { userId } = req.user as Payload;
    return await this.commentService.deleteComment(userId, commentId);
  }
}
