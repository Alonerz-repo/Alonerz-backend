import { ApiResponseProperty } from '@nestjs/swagger';
import { Block } from 'src/block/block.entity';
import { User } from 'src/user/user.entity';
import { BlockUserDto } from './block-user.dto';

export class BlocksDto {
  @ApiResponseProperty()
  users: BlockUserDto[];

  constructor(users: Block[]) {
    this.users = users.map(
      (user) => new BlockUserDto(user.otherId as unknown as User),
    );
  }
}
