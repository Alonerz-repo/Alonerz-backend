import { SwaggerOperation } from '../interface';

export const AuthTag = '사용자 인증 API';
export const AuthOperations: SwaggerOperation = {
  auth: {
    summary: '사용자 토큰 인증 API',
    description: 'AccessToken의 유효성을 검사합니다.',
  },
  kakao: {
    summary: '카카오 로그인 API Redirect',
    description:
      '카카오 API로 로그인을 하면, 서버로 해당 사용자의 정보와 토큰이 넘어옵니다.',
  },
  login: {
    summary: '사용자 로그인 API',
    description: '사용자 정보가 있으면 로그인, 없으면 회원가입으로 처리합니다.',
  },
  reissue: {
    summary: '토큰 재발급 API',
    description: '새로운 AccessToken과 RefreshToken을 발급합니다.',
  },
  logout: {
    summary: '로그아웃 API',
    description:
      '데이터베이스에서 사용자의 AccessToken과 RefreshToken을 삭제합니다.',
  },
};
