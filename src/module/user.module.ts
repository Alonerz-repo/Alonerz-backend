import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from 'src/controller/user.controller';
import { UserService } from 'src/service/user.service';

@Module({
  imports: [ConfigModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
