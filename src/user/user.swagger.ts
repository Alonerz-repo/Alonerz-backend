export const UserTag = '사용자 정보 API';
export const UserSwagger = {
  getUserProfile: {
    operation: {
      summary: '사용자 프로필 정보 조회 API',
      description: '사용자의 프로필 정보를 조회합니다.',
    },
    response: {
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
    param: {
      otherId: {
        in: 'path',
        name: 'otherId',
        type: 'string',
        example: '000001',
        required: true,
      },
    },
  },
  editMyProfile: {
    operation: {
      summary: '자신의 프로필 정보 수정 API',
      description: '자신의 프로필 정보를 수정합니다.',
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          nickname: {
            type: 'string',
            description: '닉네임',
            example: '얼로너즈',
          },
          careerId: {
            type: 'integer',
            description: '커리어 ID',
            example: 1,
          },
          year: {
            type: 'string',
            description: '연차',
            example: '신입',
          },
          description: {
            type: 'string',
            description: '한 줄 소개',
            example: '백엔드 주니어 개발자입니다.',
          },
          image: {
            type: 'string',
            description: '프로필 이미지',
            format: 'binary',
          },
        },
      },
    },
    response: {
      200: {
        status: 200,
        description: '성공',
        // type
      },
      400: {
        status: 400,
        description: '잘못된 요청',
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
