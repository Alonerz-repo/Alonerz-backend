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

  // TODO : 카카오 계정만 사용하는 경우 제거
  // 그렇지 않은 경우 authService로 옮길 것
  async serviceSignup(createUserDto: CreateUserDto): Promise<any> {
    const { email } = createUserDto;
    const isExist = await this.repository.findOneByEmail(email);
    if (isExist) this.exception.alreadyExist();

    createUserDto.password = await hash(createUserDto.password, rounds);

    const user = await this.repository.createServiceUser(createUserDto);
    delete user.password;
    return user;
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<void> {
    const isExist = await this.repository.findOne({ userId });
    if (!isExist) this.exception.notFound();

    if (updateUserDto.password !== undefined) {
      updateUserDto.password = await hash(updateUserDto.password, rounds);
    }

    await this.repository.update(userId, updateUserDto);
  }
}
