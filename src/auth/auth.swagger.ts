export const AuthSwagger = {
  tag: '사용자 인증 API',
  routes: {
    auth: {
      summary: '사용자 인가 확인 API',
      description: '자신의 프로필 정보를 조회합니다.',
    },
    kakao: {
      summary: '(API 아님) 카카오 로그인 Redirect URL',
      description:
        'Kakao Server로부터 사용자의 정보를 받아오기 위한 Redirect URL 입니다.',
    },
    login: {
      summary: '사용자 로그인 또는 회원가입 API',
      description: '서비스 자체 로그인 또는 회원가입을 합니다.',
    },
    reissue: {
      summary: '토큰 갱신 API',
      description:
        '사용자 인가 확인 시 토큰이 만료된 경우 신규 토큰 재발급을 요청할 수 있습니다.',
    },
    logout: {
      summary: '로그아웃 API',
      description:
        'DB에서 사용자의 인가 토큰을 삭제하여 안전하게 로그아웃할 수 있습니다.',
    },
  },
  response: {
    auth: {
      200: {
        status: 200,
        description: '성공',
        // type
      },
      401: {
        status: 401,
        description: '로그인 필요',
        // type
      },
      403: {
        status: 403,
        description: '토큰 만료',
        // type
      },
    },
    kakao: {
      304: {
        status: 304,
        description: 'Redirect',
        // type
      },
      401: {
        status: 401,
        description: 'Kakao 인증 실패',
        // type
      },
    },
    login: {
      201: {
        status: 201,
        description: '성공',
        // type
      },
      401: {
        status: 401,
        description: '로그인 필요',
        // type
      },
    },
    reissue: {
      201: {
        status: 201,
        description: '성공',
        // type
      },
      401: {
        status: 401,
        description: '로그인 필요',
        // type
      },
    },
    logout: {
      200: {
        status: 200,
        description: '성공',
        // type
      },
      401: {
        status: 401,
        description: '로그인 필요',
        // type
      },
    },
  },
};
