import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Payload } from 'src/common/interface';
import { CreateStickerDto } from './dto/request/create-sticker.dto';
import { CreatedStickerDto } from './dto/response/created-sticker.dto';
import { SelectStickersDto } from './dto/response/select-stickers.dto';
import { StickerService } from './sticker.service';
import { StickerSwagger } from './sticker.swagger';

@ApiTags(StickerSwagger.tag)
@Controller('stickers')
export class StickerController {
  constructor(private readonly stickerService: StickerService) {}

  @Get(':userId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(StickerSwagger.getStickers.operation)
  @ApiParam(StickerSwagger.getStickers.param.userId)
  @ApiResponse(StickerSwagger.getStickers.response[200])
  @ApiResponse(StickerSwagger.getStickers.response[401])
  @ApiResponse(StickerSwagger.getStickers.response[403])
  async getStickers(
    @Param('userId') userId: string,
  ): Promise<SelectStickersDto> {
    return await this.stickerService.getStickers(userId);
  }

  @Put()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation(StickerSwagger.createSticker.operation)
  @ApiResponse(StickerSwagger.createSticker.response[201])
  @ApiResponse(StickerSwagger.createSticker.response[400])
  @ApiResponse(StickerSwagger.createSticker.response[401])
  @ApiResponse(StickerSwagger.createSticker.response[403])
  async putSticker(
    @Req() req: Request,
    @Body() createStickerDto: CreateStickerDto,
  ): Promise<CreatedStickerDto> {
    const { userId } = req.user as Payload;
    return await this.stickerService.putSticker(userId, createStickerDto);
  }

  @Delete(':stickerId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiParam(StickerSwagger.deleteSticker.param.stickerId)
  @ApiOperation(StickerSwagger.deleteSticker.operation)
  @ApiResponse(StickerSwagger.deleteSticker.response[200])
  @ApiResponse(StickerSwagger.deleteSticker.response[401])
  @ApiResponse(StickerSwagger.deleteSticker.response[403])
  @ApiResponse(StickerSwagger.deleteSticker.response[404])
  async deleteSticker(@Param('stickerId') stickerId: number): Promise<void> {
    return await this.stickerService.deleteSticker(stickerId);
  }
}
