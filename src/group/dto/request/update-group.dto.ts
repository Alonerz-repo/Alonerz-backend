import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateGroupDto {
  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  readonly title: string;

  @ApiProperty({ type: 'integer', required: false })
  @IsOptional()
  @IsNumber()
  readonly categoryId: number;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  readonly placeName: string;

  @ApiProperty({ type: 'datetime', default: new Date(), required: false })
  @IsOptional()
  @IsDate()
  readonly startAt: Date;

  @ApiProperty({ type: 'datetime', default: new Date(), required: false })
  @IsOptional()
  @IsDate()
  readonly endAt: Date;

  @ApiProperty({ type: 'integer', required: false })
  @IsOptional()
  @IsNumber()
  readonly limit: number;

  @ApiProperty({ type: 'double', required: false })
  @IsOptional()
  @IsNumber()
  readonly locationX: number;

  @ApiProperty({ type: 'double', required: false })
  @IsOptional()
  @IsNumber()
  readonly locationY: number;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  readonly address: string;
}
