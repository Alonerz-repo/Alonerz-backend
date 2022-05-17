import { Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import {
  ApiBasicAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Payload } from 'src/common/interface';
import { BlockService } from './block.service';
import { BlockSwagger } from './block.swagger';

@ApiTags(BlockSwagger.tag)
@Controller('blocks')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  // 자신이 차단한 사용자 목록 조회
  @Get()
  @UseGuards(JwtGuard)
  @ApiBasicAuth('AccessToken')
  @ApiOperation(BlockSwagger.routes.getBlocks)
  @ApiResponse(BlockSwagger.response.getBlocks[200])
  @ApiResponse(BlockSwagger.response.getBlocks[401])
  async getBlocks(@Req() req: Request) {
    const { userId } = req.user as Payload;
    return await this.blockService.findBlocks(userId);
  }

  // 다른 사용차 차단 또는 철회
  @Put(':otherId')
  @UseGuards(JwtGuard)
  @ApiBasicAuth('AccessToken')
  @ApiOperation(BlockSwagger.routes.blockOrCancel)
  @ApiParam(BlockSwagger.param.otherId)
  @ApiResponse(BlockSwagger.response.blockOrCancel[200])
  @ApiResponse(BlockSwagger.response.blockOrCancel[401])
  async blockOrCancel(@Req() req: Request, @Param('otherId') otherId: string) {
    const { userId } = req.user as Payload;
    return await this.blockService.blockOrCancel(userId, otherId);
  }
}
