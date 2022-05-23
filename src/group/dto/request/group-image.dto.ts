import { ApiProperty } from '@nestjs/swagger';

export class GroupImageDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: Express.MulterS3.File;
}
