import { IsOptional, IsString } from 'class-validator';

export class UpdateCareerDto {
  @IsOptional()
  @IsString()
  part?: string;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
