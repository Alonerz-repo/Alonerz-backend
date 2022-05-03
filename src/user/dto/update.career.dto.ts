import { IsOptional, IsString } from 'class-validator';

export class UpdateCareerDto {
  @IsOptional()
  @IsString()
  readonly part: string;

  @IsOptional()
  @IsString()
  readonly year: string;

  @IsOptional()
  @IsString()
  readonly description: string;
}
