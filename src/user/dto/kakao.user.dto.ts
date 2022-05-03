import { Career } from '../career.entity';

export class KakaoUser {
  kakaoId: string;
  nickname: string;
  profileImageUrl: string;
  thumbnailImageUrl: string;
  gender: 'male' | 'female' | null;
  connectedAt: Date;
  point: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  careers: Career[];
}
