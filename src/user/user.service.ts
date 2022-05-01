import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { bcryptConstants } from 'src/common/constants';
import { CreateUserDto } from './dto/create.user.dto';
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

  async serviceSignup(createUserDto: CreateUserDto): Promise<any> {
    const { email } = createUserDto;
    const isExist = await this.repository.findOneByEmail(email);
    if (isExist) this.exception.alreadyExist();

    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      bcryptConstants.rounds,
    );

    const user = await this.repository.createServiceUser(createUserDto);
    delete user.password;
    return user;
  }

  async update(userId: number, updateUserDto: UpdateUserDto): Promise<void> {
    const isExist = await this.repository.findOne({ userId });
    if (!isExist) this.exception.notFound();

    if (updateUserDto.password !== undefined) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        bcryptConstants.rounds,
      );
    }

    await this.repository.update(userId, updateUserDto);
  }

  async remove(userId: number): Promise<void> {
    await this.repository.delete(userId);
  }
}
