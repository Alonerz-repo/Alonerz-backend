import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({ type: 'integer' })
  @IsNotEmpty()
  @IsNumber()
  readonly categoryId: number;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  readonly placeName: string;

  @ApiProperty({ type: 'datetime', default: new Date() })
  @IsNotEmpty()
  @IsDate()
  readonly startAt: Date;

  @ApiProperty({ type: 'datetime', default: new Date() })
  @IsNotEmpty()
  @IsDate()
  readonly endAt: Date;

  @ApiProperty({ type: 'integer' })
  @IsNotEmpty()
  @IsNumber()
  readonly limit: number;

  @ApiProperty({ type: 'double' })
  @IsNotEmpty()
  @IsNumber()
  readonly locationX: number;

  @ApiProperty({ type: 'double' })
  @IsNotEmpty()
  @IsNumber()
  readonly locationY: number;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  readonly address: string;
}
