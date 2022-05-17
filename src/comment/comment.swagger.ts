export const CommentSwagger = {
  tag: '댓글 API',
  getGroupComments: {
    operation: {
      summary: '그룹 댓글 조회 API',
      description: '특정 그룹의 댓글을 조회합니다.',
    },
    response: {
      200: {
        status: 200,
        description: '성공',
        // type
      },
      404: {
        status: 404,
        description: '그룹 없음',
        // type
      },
    },
    param: {
      groupId: {
        in: 'path',
        name: 'groupId',
        example: '050b9744-b833-4c49-b35a-c9c7e631c2e2',
        required: true,
      },
    },
    query: {
      offset: {
        name: 'offset',
        example: 0,
        required: false,
      },
    },
  },
  createGroupComment: {
    operation: {
      summary: '그룹 댓글 등록 API',
      description: '특정 그룹에 새로운 댓글을 등록합니다.',
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          content: {
            type: 'string',
            description: '댓글 내용',
            example: '혹시 30분 늦게 참석해도 되나요?',
          },
        },
      },
    },
    param: {
      groupId: {
        in: 'path',
        name: 'groupId',
        example: '050b9744-b833-4c49-b35a-c9c7e631c2e2',
        required: true,
      },
    },
    response: {
      201: {
        status: 201,
        description: '성공',
        // type
      },
      400: {
        status: 400,
        description: '잘못된 입력',
        // type
      },
      401: {
        status: 401,
        description: '로그인 필요',
        // type
      },
      404: {
        status: 404,
        description: '그룹 없음',
        // type
      },
    },
  },
  getChildComments: {
    operation: {
      summary: '히위 댓글 조회 API',
      description: '특정 댓글의 하위 댓글을 조회합니다.',
    },
    param: {
      groupId: {
        in: 'path',
        name: 'groupId',
        example: '050b9744-b833-4c49-b35a-c9c7e631c2e2',
        required: true,
      },
      parentId: {
        in: 'path',
        name: 'parentId',
        example: '1',
        required: true,
      },
    },
    query: {
      offset: {
        name: 'offset',
        example: 0,
        required: false,
      },
    },
    response: {
      200: {
        status: 200,
        description: '성공',
        // type
      },
      404: {
        status: 404,
        description: '그룹 또는 상위 댓글 없음',
        // type
      },
    },
  },
  createChildComment: {
    operation: {
      summary: '히위 댓글 등록 API',
      description: '특정 댓글에 하위 댓글을 등록합니다.',
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          content: {
            type: 'string',
            description: '댓글 내용',
            example: '혹시 30분 늦게 참석해도 되나요?',
          },
        },
      },
    },
    param: {
      groupId: {
        in: 'path',
        name: 'groupId',
        example: '050b9744-b833-4c49-b35a-c9c7e631c2e2',
        required: true,
      },
      parentId: {
        in: 'path',
        name: 'parentId',
        example: '1',
        required: true,
      },
    },
    response: {
      201: {
        status: 201,
        description: '성공',
        // type
      },
      400: {
        status: 400,
        description: '잘못된 입력',
        // type
      },
      401: {
        status: 401,
        description: '로그인 필요',
        // type
      },
      404: {
        status: 404,
        description: '그룹 또는 상위 댓글 없음',
        // type
      },
    },
  },
  updateComment: {
    operation: {
      summary: '특정 댓글 수정 API',
      description: '특정 상위 댓글, 하위 댓글을 수정합니다.',
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          content: {
            type: 'string',
            description: '댓글 내용',
            example: '혹시 30분 늦게 참석해도 되나요?',
          },
        },
      },
    },
    param: {
      commentId: {
        in: 'path',
        name: 'commentId',
        example: 1,
        required: true,
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
        description: '잘못된 입력',
        // type
      },
      401: {
        status: 401,
        description: '로그인 필요',
        // type
      },
      403: {
        status: 403,
        description: '수정 권한 없음',
        // type
      },
      404: {
        status: 404,
        description: '댓글 조회 실패',
        // type
      },
    },
  },
  deleteComment: {
    operation: {
      summary: '특정 댓글 삭제 API',
      description: '특정 상위 댓글, 하위 댓글을 삭제합니다.',
    },
    param: {
      commentId: {
        in: 'path',
        name: 'commentId',
        example: 1,
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
      403: {
        status: 403,
        description: '삭제 권한 없음',
        // type
      },
      404: {
        status: 404,
        description: '댓글 조회 실패',
        // type
      },
    },
  },
  query: {
    groupId: {
      name: 'groupId',
      example: 1,
      required: true,
    },
    offset: {
      name: 'offset',
      example: 0,
      required: false,
    },
  },
  param: {
    commentId: {
      in: 'path',
      name: 'commentId',
      example: 1,
      required: true,
    },
    parentId: {
      in: 'path',
      name: 'parentId',
      example: 1,
      required: true,
    },
  },
};
