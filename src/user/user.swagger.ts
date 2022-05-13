export const UserSwagger = {
  tag: '사용자 정보 API',
  routes: {
    getMyProfile: {
      summary: '자신의 프로필 정보 조회 API',
      description: '자신의 프로필 정보를 조회합니다.',
    },
    getOtherProfile: {
      summary: '다른 사용자의 프로필 정보 조회 API',
      description: '다른 사용자의 프로필 정보를 조회합니다.',
    },
    editMyProfile: {
      summary: '자신의 프로필 정보 수정 API',
      description: '자신의 프로필 정보를 수정합니다.',
    },
  },
  response: {
    getMyProfile: {
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
    getOtherProfile: {
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
    editMyProfile: {
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
  param: {
    userId: {
      in: 'path',
      name: 'userId',
      type: 'number',
      example: 1,
      required: true,
    },
  },
};
