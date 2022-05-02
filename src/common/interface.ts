export interface Payload {
  userId: number;
  email: string;
  nickname: string;
  kakaoId: number;
}

// 카카오 페이로드 부분 수정(link - KakaoStrategy)
export interface KakaoPayload {
  accessToken: string;
}
