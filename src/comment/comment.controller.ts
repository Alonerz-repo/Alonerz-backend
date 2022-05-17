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
  ApiBody,
  ApiConsumes,
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
  @Get(':groupId')
  @ApiParam(CommentSwagger.getGroupComments.param.groupId)
  @ApiQuery(CommentSwagger.getGroupComments.query.offset)
  @ApiOperation(CommentSwagger.getGroupComments.operation)
  @ApiResponse(CommentSwagger.getGroupComments.response[200])
  @ApiResponse(CommentSwagger.getGroupComments.response[404])
  async getGroupComments(
    @Param('groupId') groupId: string,
    @Query('offset') offset: number,
  ) {
    return await this.commentService.getGroupComments(groupId, offset);
  }

  // 그룹 댓글 작성
  @Post(':groupId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody(CommentSwagger.createGroupComment.body)
  @ApiQuery(CommentSwagger.createGroupComment.param.groupId)
  @ApiOperation(CommentSwagger.createGroupComment.operation)
  @ApiResponse(CommentSwagger.createGroupComment.response[201])
  @ApiResponse(CommentSwagger.createGroupComment.response[400])
  @ApiResponse(CommentSwagger.createGroupComment.response[401])
  @ApiResponse(CommentSwagger.createGroupComment.response[404])
  async createGroupComment(
    @Req() req: Request,
    @Param('groupId') groupId: string,
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
  @Get(':groupId/:parentId')
  @ApiQuery(CommentSwagger.getChildComments.query.offset)
  @ApiParam(CommentSwagger.getChildComments.param.groupId)
  @ApiParam(CommentSwagger.getChildComments.param.parentId)
  @ApiOperation(CommentSwagger.getChildComments.operation)
  @ApiResponse(CommentSwagger.getChildComments.response[200])
  @ApiResponse(CommentSwagger.getChildComments.response[404])
  async getChildComments(
    @Param('groupId') groupId: string,
    @Param('parentId') parentId: number,
    @Query('offset') offset: number,
  ) {
    return await this.commentService.getChildComments(
      groupId,
      parentId,
      offset,
    );
  }

  // 하위 댓글 작성
  @Post(':groupId/:parentId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody(CommentSwagger.createChildComment.body)
  @ApiParam(CommentSwagger.createChildComment.param.groupId)
  @ApiParam(CommentSwagger.createChildComment.param.parentId)
  @ApiOperation(CommentSwagger.createChildComment.operation)
  @ApiResponse(CommentSwagger.createChildComment.response[201])
  @ApiResponse(CommentSwagger.createChildComment.response[400])
  @ApiResponse(CommentSwagger.createChildComment.response[401])
  @ApiResponse(CommentSwagger.createChildComment.response[404])
  async createChildComment(
    @Req() req: Request,
    @Param('groupId') groupId: string,
    @Param('parentId') parentId: number,
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
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody(CommentSwagger.updateComment.body)
  @ApiParam(CommentSwagger.updateComment.param.commentId)
  @ApiOperation(CommentSwagger.updateComment.operation)
  @ApiResponse(CommentSwagger.updateComment.response[200])
  @ApiResponse(CommentSwagger.updateComment.response[400])
  @ApiResponse(CommentSwagger.updateComment.response[401])
  @ApiResponse(CommentSwagger.updateComment.response[403])
  @ApiResponse(CommentSwagger.updateComment.response[404])
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
  @ApiParam(CommentSwagger.deleteComment.param.commentId)
  @ApiOperation(CommentSwagger.deleteComment.operation)
  @ApiResponse(CommentSwagger.deleteComment.response[200])
  @ApiResponse(CommentSwagger.deleteComment.response[401])
  @ApiResponse(CommentSwagger.deleteComment.response[403])
  @ApiResponse(CommentSwagger.deleteComment.response[404])
  async deleteComment(
    @Req() req: Request,
    @Param('commentId') commentId: number,
  ) {
    const { userId } = req.user as Payload;
    return await this.commentService.deleteComment(userId, commentId);
  }
}
