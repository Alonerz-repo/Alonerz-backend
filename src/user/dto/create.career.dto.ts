import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCareerDto {
  @IsString()
  @IsNotEmpty()
  readonly part: string;

  @IsString()
  @IsNotEmpty()
  readonly year: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
