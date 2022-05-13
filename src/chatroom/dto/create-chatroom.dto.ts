import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateChatRoomDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  otherId: number;
}
