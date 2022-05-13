export const BlockSwagger = {
  tag: '사용자 차단 API',
  routes: {
    getBlocks: {
      summary: '자신이 차단한 사용자 목록 조회 API',
      description: '자신이 차단한 사용자의 목록을 조회합니다.',
    },
    blockOrCancel: {
      summary: '다른 사용자 차단 또는 취소 API',
      description: '다른 사용자를 차단하거나, 차단 상태를 철회합니다.',
    },
  },
  response: {
    getBlocks: {
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
    blockOrCancel: {
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
    otherId: {
      in: 'path',
      name: 'otherId',
      type: 'number',
      example: 1,
      required: true,
    },
  },
};
