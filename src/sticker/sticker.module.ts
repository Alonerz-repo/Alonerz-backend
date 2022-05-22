import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthException } from 'src/auth/auth.exception';
import { StickerController } from './sticker.controller';
import { StickerException } from './sticker.exception';
import { StickerRepository } from './sticker.repository';
import { StickerService } from './sticker.service';

@Module({
  imports: [TypeOrmModule.forFeature([StickerRepository]), AuthException],
  controllers: [StickerController],
  providers: [StickerService, StickerException, AuthException],
})
export class StickerModule {}
