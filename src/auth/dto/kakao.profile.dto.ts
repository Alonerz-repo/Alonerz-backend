export class KakaoProfileDto {
  id: number;
  connected_at: Date;
  kakao_account: {
    profile: {
      nickname: string;
      profile_image_url: string;
    };
    email_needs_agreement: boolean;
    email?: string;
    gender?: string;
  };
}
