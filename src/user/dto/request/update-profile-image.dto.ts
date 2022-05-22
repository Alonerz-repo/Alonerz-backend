import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: Express.MulterS3.File;
}
