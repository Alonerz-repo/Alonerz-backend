import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserException } from './user.exception';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private repository: UserRepository,
    private exception: UserException,
  ) {}

  async update(kakaoId: string, updateUserDto: UpdateUserDto): Promise<void> {
    console.log('TODO');
  }
}
