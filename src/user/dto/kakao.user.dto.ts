import { Career } from '../career.entity';

export class KakaoUser {
  kakaoId: string;
  nickname: string;
  profileImageUrl: string;
  thumbnailImageUrl: string;
  gender: 'male' | 'female' | null;
  connectedAt: Date;
  point: number;
  careers: Career[];
}
