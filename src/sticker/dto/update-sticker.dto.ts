import { IsOptional } from 'class-validator';

export class UpdateStickerDto {
  @IsOptional()
  readonly stickerUrl?: string;

  @IsOptional()
  readonly order?: number;
}
