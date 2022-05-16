import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageRepository } from './image.repository';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository,
  ) {}

  async uploadImage(image: Express.MulterS3.File) {
    const file = this.imageRepository.create();
    file.originalName = image.originalname;
    file.mimeType = image.mimetype;
    file.size = image.size;
    file.url = image.location;
    console.log(file);
    await this.imageRepository.save(file);
    return file;
  }
}
