import { IsString } from 'class-validator';

export class CreateCareerDto {
  @IsString()
  part: string;

  @IsString()
  year: string;

  @IsString()
  description: string;
}
