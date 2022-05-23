import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGroupDto {
  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  readonly title: string;

  @ApiProperty({ type: 'integer' })
  @IsOptional()
  @IsNumber()
  readonly categoryId: number;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  readonly placeName: string;

  @ApiProperty({ type: 'datetime', default: new Date() })
  @IsOptional()
  @IsDate()
  readonly startAt: Date;

  @ApiProperty({ type: 'datetime', default: new Date() })
  @IsOptional()
  @IsDate()
  readonly endAt: Date;

  @ApiProperty({ type: 'integer' })
  @IsOptional()
  @IsNumber()
  readonly limit: number;

  @ApiProperty({ type: 'double' })
  @IsOptional()
  @IsNumber()
  readonly locationX: number;

  @ApiProperty({ type: 'double' })
  @IsOptional()
  @IsNumber()
  readonly locationY: number;

  @ApiProperty({ type: 'string' })
  @IsOptional()
  @IsString()
  readonly address: string;
}
