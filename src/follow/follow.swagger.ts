export const FollowSwagger = {
  tag: '사용자 팔로우 API',
  getUserFollows: {
    operation: {
      summary: '사용자 팔로잉 또는 팔로워 목록 조회 API',
      description: '사용자의 팔로잉 또는 팔로워 목록을 조회합니다.',
    },
    param: {
      userId: {
        in: 'path',
        name: 'userId',
        type: 'string',
        example: 'c4ef4a2a-b215-45cc-b98c-101438104540',
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
      },
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
  },
  followOrCancel: {
    operation: {
      summary: '다른 사용자 팔로잉 또는 취소 API',
      description: '다른 사용자를 팔로잉하거나, 팔로잉 상태를 철회합니다.',
    },
    param: {
      otherId: {
        in: 'path',
        name: 'otherId',
        type: 'string',
        example: 'c4ef4a2a-b215-45cc-b98c-101438104540',
        required: true,
      },
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
  },
};
