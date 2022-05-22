import { ApiResponseProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiResponseProperty()
  readonly statusCode: number;

  @ApiResponseProperty()
  readonly message: string[];

  @ApiResponseProperty()
  readonly error: string;
}
