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
import { UpdateStickerDto } from './dto/request/update-sticker.dto';
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
  async getStickers(
    @Param('userId') userId: string,
  ): Promise<SelectStickersDto> {
    return await this.stickerService.getStickers(userId);
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation(StickerSwagger.createSticker.operation)
  @ApiResponse(StickerSwagger.createSticker.response[201])
  @ApiResponse(StickerSwagger.createSticker.response[400])
  @ApiResponse(StickerSwagger.createSticker.response[401])
  async createSticker(
    @Req() req: Request,
    @Body() createStickerDto: CreateStickerDto,
  ): Promise<CreatedStickerDto> {
    const { userId } = req.user as Payload;
    return await this.stickerService.createSticker(userId, createStickerDto);
  }

  @Patch(':stickerId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation(StickerSwagger.updateSticker.operation)
  @ApiParam(StickerSwagger.updateSticker.param.stickerId)
  @ApiResponse(StickerSwagger.updateSticker.response[200])
  @ApiResponse(StickerSwagger.updateSticker.response[401])
  @ApiResponse(StickerSwagger.updateSticker.response[404])
  async updateSticker(
    @Param('stickerId') stickerId: number,
    @Body() updateStickerDto: UpdateStickerDto,
  ): Promise<void> {
    return await this.stickerService.updateSticker(stickerId, updateStickerDto);
  }

  @Delete(':stickerId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiParam(StickerSwagger.deleteSticker.param.stickerId)
  @ApiOperation(StickerSwagger.deleteSticker.operation)
  @ApiResponse(StickerSwagger.deleteSticker.response[200])
  @ApiResponse(StickerSwagger.deleteSticker.response[401])
  @ApiResponse(StickerSwagger.deleteSticker.response[404])
  async deleteSticker(@Param('stickerId') stickerId: number): Promise<void> {
    return await this.stickerService.deleteSticker(stickerId);
  }
}
