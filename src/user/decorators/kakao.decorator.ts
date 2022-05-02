import { SetMetadata } from '@nestjs/common';

export const KAKAO_KEY = 'kakaoId';
export const KakaoVerified = (flag: boolean) => SetMetadata(KAKAO_KEY, flag);
