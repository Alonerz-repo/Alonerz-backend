import { UserInfoRow } from 'src/user/row/user-info.row';

export class UserBlockRow {
  id: number;
  userId?: number | UserInfoRow;
  otherId?: number | UserInfoRow;
}
