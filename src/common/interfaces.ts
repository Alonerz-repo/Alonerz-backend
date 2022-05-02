export interface JwtPayload {
  userId?: number;
  kakaoId?: number;
  iat?: number;
  exp?: number;
}

export interface KakaoPayload {
  kakaoId?: number;
  gender?: 'male' | 'female';
}

// TODO : refreshToken 추가
export interface JwtTokens {
  accessToken: string;
}

export interface KakaoAccount {
  id: number;
  connected_at: Date;
  kakao_account: {
    profile: {
      nickname: string;
      profile_image_url: string;
      thumbnail_image_url: string;
    };
    gender?: string;
  };
}
