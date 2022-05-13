import { ApiProperty } from '@nestjs/swagger';
import { userInfo } from 'os';
import { UserInfoRow } from 'src/user/row/user-info.row';

export class FollowRow {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: userInfo })
  userId?: number | UserInfoRow;

  @ApiProperty({ example: userInfo })
  otherId?: number | UserInfoRow;
}
