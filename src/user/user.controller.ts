import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { Payload } from 'src/common/interface';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserSwagger } from './user.swagger';
import { ProfileImageInterceptor } from 'src/image/image.interceptors';
import { UpdateProfileDto } from './dto/request/update-profile.dto';
import { SelectMainDto } from './dto/response/select-main.dto';
import { UpdatedProfileImageDto } from './dto/response/updated-profile-image.dto';
import { SelectBoardDto } from './dto/response/select-board.dto';
import { SelectProfileDto } from './dto/response/select-profile.dto';
import { UpdateBoardDto } from './dto/request/update-board.dto';
import { UpdateProfileImageDto } from './dto/request/update-profile-image.dto';

@ApiTags(UserSwagger.tag)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // 사용자 메인 페이지의 정보 조회
  @Get(':userId/main')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiParam(UserSwagger.getUser.param.userId)
  @ApiOperation(UserSwagger.getUser.operation)
  @ApiResponse(UserSwagger.getUser.response[200])
  @ApiResponse(UserSwagger.getUser.response[401])
  @ApiResponse(UserSwagger.getUser.response[404])
  async getUser(
    @Req() req: Request,
    @Param('userId') otherId: string,
  ): Promise<SelectMainDto> {
    const { userId } = req.user as Payload;
    return this.userService.getUser(userId, otherId);
  }

  // 사용자 프로필 페이지의 정보 조회
  @Get(':userId/profile')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiParam(UserSwagger.getProfile.param.userId)
  @ApiOperation(UserSwagger.getProfile.operation)
  @ApiResponse(UserSwagger.getProfile.response[200])
  @ApiResponse(UserSwagger.getProfile.response[401])
  @ApiResponse(UserSwagger.getProfile.response[404])
  async getProfile(@Param('userId') userId: string): Promise<SelectProfileDto> {
    return this.userService.getProfile(userId);
  }

  // 사용자 보드(스티커, 캐릭터, 배경색상) 페이지의 정보 조회
  @Get(':userId/board')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiParam(UserSwagger.getBoard.param.userId)
  @ApiOperation(UserSwagger.getBoard.operation)
  @ApiResponse(UserSwagger.getBoard.response[200])
  @ApiResponse(UserSwagger.getBoard.response[401])
  async getBoard(@Param('userId') userId: string): Promise<SelectBoardDto> {
    return this.userService.getBoard(userId);
  }

  // 프로필 정보 수정
  @Patch('profile')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation(UserSwagger.updateProfile.operation)
  @ApiResponse(UserSwagger.updateProfile.response[200])
  @ApiResponse(UserSwagger.updateProfile.response[400])
  @ApiResponse(UserSwagger.updateProfile.response[401])
  async updateProfile(
    @Req() req: Request,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<void> {
    const { userId } = req.user as Payload;
    return this.userService.updateProfile(userId, updateProfileDto);
  }

  // 프로필 이미지 수정
  @Patch('profileImage')
  @UseGuards(JwtGuard)
  @UseInterceptors(ProfileImageInterceptor())
  @ApiBearerAuth('AccessToken')
  @ApiConsumes('multipart/form-data')
  @ApiBody(UserSwagger.updateProfileImage.body)
  @ApiOperation(UserSwagger.updateProfileImage.operation)
  @ApiResponse(UserSwagger.updateProfileImage.response[200])
  @ApiResponse(UserSwagger.updateProfileImage.response[400])
  @ApiResponse(UserSwagger.updateProfileImage.response[401])
  async updateProfileImage(
    @Req() req: Request,
    @UploadedFile() updateProfileImageDto: UpdateProfileImageDto,
  ): Promise<UpdatedProfileImageDto> {
    const { userId } = req.user as Payload;
    const image = updateProfileImageDto as unknown as Express.MulterS3.File;
    return this.userService.updateProfileImage(userId, image);
  }

  // 프로필 이미지 삭제
  @Delete('profileImage')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(UserSwagger.deleteProfileImage.operation)
  @ApiResponse(UserSwagger.deleteProfileImage.response[200])
  @ApiResponse(UserSwagger.deleteProfileImage.response[401])
  async deleteProfileImage(@Req() req: Request): Promise<void> {
    const { userId } = req.user as Payload;
    return this.userService.deleteProfileImage(userId);
  }

  // 보드(캐릭터, 배경색상) 수정
  @Patch('board')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation(UserSwagger.updateBoard.operation)
  @ApiResponse(UserSwagger.updateBoard.response[200])
  @ApiResponse(UserSwagger.updateBoard.response[400])
  @ApiResponse(UserSwagger.updateBoard.response[401])
  async updateBoard(
    @Req() req: Request,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<void> {
    const { userId } = req.user as Payload;
    return this.userService.updateBoard(userId, updateBoardDto);
  }
}
