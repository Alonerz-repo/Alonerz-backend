import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { s3Bucket, s3Config } from './configs';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';

const s3 = new AWS.S3();
s3.config.update(s3Config);

const multerOptions: MulterOptions = {
  storage: multerS3({
    s3,
    bucket: s3Bucket,
    acl: 'public-read',
    key: (_, image, callback) => {
      callback(null, image.originalname);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
};

export const S3Interceptor = () => FileInterceptor('image', multerOptions);
