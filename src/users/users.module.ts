import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([UsersRepository])
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
