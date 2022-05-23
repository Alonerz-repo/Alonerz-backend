import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { s3Config, s3Buckets } from 'src/common/configs';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();
s3.config.update(s3Config);

export const multerS3Option = (bucket: string): MulterOptions => ({
  storage: multerS3({
    s3,
    bucket,
    acl: 'public-read',
    key: (_, image, callback) => {
      callback(null, `${Date.now()}-${image.originalname}`);
    },
    contentType: (_, image, callback) => {
      callback(null, image.mimetype);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

export const ProfileImageInterceptor = () =>
  FileInterceptor('image', multerS3Option(s3Buckets.profileImage));

export const GroupImageInterceptor = () =>
  FileInterceptor('image', multerS3Option(s3Buckets.groupImage));
