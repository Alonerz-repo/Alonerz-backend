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
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Payload } from 'src/common/interface';
import { CreateStickerDto } from './dto/create-sticker.dto';
import { CreatedStickerDto } from './dto/created-sticker.dto';
import { DeletedStickerDto } from './dto/deleted-sticker.dto';
import { SelectedStickersDto } from './dto/selected-stickers.dto';
import { UpdateStickerDto } from './dto/update-sticker.dto';
import { UpdatedStickerDto } from './dto/updated-sticker.dto';
import { StickerService } from './sticker.service';
import { StickerSwagger } from './sticker.swagger';

@ApiTags(StickerSwagger.tag)
@Controller('stickers')
export class StickerController {
  constructor(private readonly stickerService: StickerService) {}

  @Get(':userId')
  @ApiOperation(StickerSwagger.getStickers.operation)
  @ApiParam(StickerSwagger.getStickers.param.userId)
  @ApiResponse(StickerSwagger.getStickers.response[200])
  async getStickers(
    @Param('userId') userId: string,
  ): Promise<SelectedStickersDto> {
    return await this.stickerService.getStickers(userId);
  }

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody(StickerSwagger.createSticker.body)
  @ApiOperation(StickerSwagger.createSticker.operation)
  @ApiResponse(StickerSwagger.createSticker.response[201])
  @ApiResponse(StickerSwagger.createSticker.response[400])
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
  @ApiBody(StickerSwagger.updateSticker.body)
  @ApiParam(StickerSwagger.updateSticker.param.stickerId)
  @ApiOperation(StickerSwagger.updateSticker.operation)
  @ApiResponse(StickerSwagger.updateSticker.response[200])
  @ApiResponse(StickerSwagger.updateSticker.response[401])
  @ApiResponse(StickerSwagger.updateSticker.response[404])
  async updateSticker(
    @Param('stickerId') stickerId: number,
    @Body() updateStickerDto: UpdateStickerDto,
  ): Promise<UpdatedStickerDto> {
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
  async deleteSticker(
    @Param('stickerId') stickerId: number,
  ): Promise<DeletedStickerDto> {
    return await this.stickerService.deleteSticker(stickerId);
  }
}
