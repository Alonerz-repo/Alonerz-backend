import { EntityRepository, QueryRunner, Repository } from 'typeorm';
import { Image } from './image.entity';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {
  async uploadImageTransaction(
    queryRunner: QueryRunner,
    image: Express.MulterS3.File,
  ) {
    console.log(image.location);
    await queryRunner.manager.save(Image, {
      originalName: image.originalname,
      mimeType: image.mimetype,
      size: image.size,
      url: image.location,
    });
    return image.location;
  }
}
