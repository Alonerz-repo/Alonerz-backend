import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { configs } from './common/configs';
import { CategoryModule } from './category/category.module';

const { typeorm } = configs;

@Module({
  imports: [
    TypeOrmModule.forRoot(typeorm),
    UserModule,
    AuthModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
