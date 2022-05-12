import { Auth, AuthReissue, AuthTokens } from 'src/dto/auth.dto';
import { SwaggerResponse } from '../interface';

export const AuthResponse: SwaggerResponse = {
  auth: {
    ok: {
      description: '토큰 인증을 성공하였습니다.',
      type: Auth,
    },
    unauthorized: {
      description: '로그인이 필요합니다.',
    },
    forbidden: {
      description: '토큰 갱신이 필요합니다.',
    },
  },
  kakao: {
    redirect: {
      status: 304,
      description: '클라이언트 페이지로 kakaoId를 넘겨줍니다.',
    },
  },
  login: {
    created: {
      description: '로그인이 완료되었습니다.',
      type: AuthTokens,
    },
  },
  token: {
    ok: {
      description: '토큰 재발급이 완료되었습니다.',
      type: AuthReissue,
    },
  },
  logout: {
    ok: {
      description: '로그아웃되었습니다.',
    },
  },
};
