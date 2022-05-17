import { UserInfoRow } from 'src/user/row/user-info.row';

export class UserBlockRow {
  id: number;
  userId?: string | UserInfoRow;
  otherId?: string | UserInfoRow;
}
