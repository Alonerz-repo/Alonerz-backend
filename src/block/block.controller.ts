import {
  ApiBasicAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Payload } from 'src/common/interface';
import { BlockService } from './block.service';
import { BlockSwagger } from './block.swagger';
import { BlocksDto } from './dto/response/blocks.dto';

@ApiTags(BlockSwagger.tag)
@Controller('blocks')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  // 자신이 차단한 사용자 목록 조회
  @Get()
  @UseGuards(JwtGuard)
  @ApiBasicAuth('AccessToken')
  @ApiOperation(BlockSwagger.getBlocks.operation)
  @ApiResponse(BlockSwagger.getBlocks.response[200])
  @ApiResponse(BlockSwagger.getBlocks.response[401])
  @ApiResponse(BlockSwagger.getBlocks.response[403])
  async getBlocks(@Req() req: Request): Promise<BlocksDto> {
    const { userId } = req.user as Payload;
    return await this.blockService.findBlocks(userId);
  }

  // 다른 사용차 차단 또는 철회
  @Put(':otherId')
  @UseGuards(JwtGuard)
  @ApiBasicAuth('AccessToken')
  @ApiOperation(BlockSwagger.blockOrCancel.operation)
  @ApiParam(BlockSwagger.blockOrCancel.param.otherId)
  @ApiResponse(BlockSwagger.blockOrCancel.response[200])
  @ApiResponse(BlockSwagger.blockOrCancel.response[401])
  @ApiResponse(BlockSwagger.blockOrCancel.response[403])
  async blockOrCancel(
    @Req() req: Request,
    @Param('otherId') otherId: string,
  ): Promise<void> {
    const { userId } = req.user as Payload;
    await this.blockService.blockOrCancel(userId, otherId);
    return;
  }
}
