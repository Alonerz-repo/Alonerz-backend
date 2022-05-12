import { SwaggerProperty } from '../interface';

export const AuthProperty: SwaggerProperty = {
  userId: {
    example: 0,
  },
  kakaoId: {
    example: '',
  },
  nickname: {
    example: '',
  },
  accessToken: {
    example: '',
  },
  refreshToken: {
    example: '',
  },
  auth: {
    example: {
      userId: '',
      kakaoId: '',
      nickname: '',
    },
  },
};
