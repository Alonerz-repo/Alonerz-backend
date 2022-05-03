export interface JwtPayload {
  kakaoId?: string;
  iat?: number;
  exp?: number;
}

export interface KakaoPayload {
  kakaoId?: string;
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
    gender?: 'male' | 'female' | null;
  };
}

export interface KakaoAccountAPI {
  kakaoId: string;
  nickname: string;
  gender: 'male' | 'female' | null;
  profileImageUrl: string;
  thumbnailImageUrl: string;
  connectedAt: Date;
}
