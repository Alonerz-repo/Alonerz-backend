export const FollowSwagger = {
  tag: '사용자 팔로우 API',
  routes: {
    getMyFollows: {
      summary: '자신의 팔로잉 또는 팔로워 목록 조회 API',
      description: '자신의 팔로잉 또는 팔로워 목록을 조회합니다.',
    },
    getOtherFollows: {
      summary: '다른 사용자 팔로잉 또는 팔로워 목록 조회 API',
      description: '다른 사용자의 팔로잉 또는 팔로워 목록을 조회합니다.',
    },
    followOrCancel: {
      summary: '다른 사용자 팔로잉 또는 취소 API',
      description: '다른 사용자를 팔로잉하거나, 팔로잉 상태를 철회합니다.',
    },
  },
  response: {
    getMyFollows: {
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
    getOtherFollows: {
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
    followOrCancel: {
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
    otherId: {
      in: 'path',
      name: 'otherId',
      type: 'number',
      example: 1,
      required: true,
    },
  },
  query: {
    type: {
      name: 'type',
      type: 'string',
      examples: {
        1: {
          summary: '팔로잉 목록',
          value: 'following',
        },
        2: {
          summary: '팔로워 목록',
          value: 'follower',
        },
      },
      required: true,
    },
  },
};
