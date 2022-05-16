import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { S3Interceptor } from 'src/common/aws-s3';

@Controller('/images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(S3Interceptor())
  async uploadImage(@UploadedFile() file: Express.MulterS3.File) {
    return this.imageService.uploadImage(file);
  }
}
