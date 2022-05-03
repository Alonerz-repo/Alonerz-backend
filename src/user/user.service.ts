import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { UserException } from './user.exception';
import { UserRepository } from './user.repository';
import { configs } from 'src/common/configs';
import { hash } from 'bcrypt';

const { rounds } = configs.bcrypt;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private repository: UserRepository,
    private exception: UserException,
  ) {}

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<void> {
    // const isExist = await this.repository.findOne({ userId });
    // if (!isExist) this.exception.notFound();
    // if (updateUserDto.password !== undefined) {
    //   updateUserDto.password = await hash(updateUserDto.password, rounds);
    // }
    // await this.repository.update(userId, updateUserDto);
  }
}
