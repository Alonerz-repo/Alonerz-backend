import {
  Body,
  Controller,
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
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserSwagger, UserTag } from './user.swagger';
import { S3Interceptor } from 'src/common/aws-s3';

@ApiTags(UserTag)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // 다른 사용자의 프로필 조회
  @Get(':otherId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiParam(UserSwagger.getUserProfile.param.otherId)
  @ApiOperation(UserSwagger.getUserProfile.operation)
  @ApiResponse(UserSwagger.getUserProfile.response[200])
  @ApiResponse(UserSwagger.getUserProfile.response[401])
  async getUserProfile(@Req() req: Request, @Param('otherId') otherId: string) {
    const { userId } = req.user as Payload;
    return this.userService.getUserProfile(userId, otherId);
  }

  // 자신의 프로필 정보 수정
  @Patch()
  @UseGuards(JwtGuard)
  @UseInterceptors(S3Interceptor())
  @ApiBearerAuth('AccessToken')
  @ApiConsumes('multipart/form-data')
  @ApiBody(UserSwagger.editMyProfile.body)
  @ApiOperation(UserSwagger.editMyProfile.operation)
  @ApiResponse(UserSwagger.editMyProfile.response[200])
  @ApiResponse(UserSwagger.editMyProfile.response[400])
  @ApiResponse(UserSwagger.editMyProfile.response[401])
  async editMyProfile(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.MulterS3.File,
  ) {
    const { userId } = req.user as Payload;
    return this.userService.updateMyProfile(userId, image, updateUserDto);
  }
}
