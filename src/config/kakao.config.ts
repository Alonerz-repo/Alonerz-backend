import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  kakaoRestApiKey: process.env.KAKAO_REST_API_KEY,
  kakaoRedirectUri: 'http://localhost:3000/auth/kakao/oauth',
}));
