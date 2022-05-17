export const GroupSwagger = {
  tag: '그룹 API',
  getTodayGroups: {
    operation: {
      summary: '오늘 참여 예정된 그룹 목록 조회 API',
      description: '오늘 참여하기로 예정된 자신의 그룹 목록을 조회합니다.',
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
  getGroupsByQuery: {
    operation: {
      summary: '전체, 아침&점심, 저녁&야식 그룹 목록 조회 API',
      description:
        '조건에 따라 전체, 아침&점심, 저녁&야식 시간대의 그룹 목록을 조회합니다.',
    },
    response: {
      200: {
        status: 200,
        description: '성공',
        // type
      },
    },
    query: {
      x: {
        name: 'x',
        type: 'number',
        example: 36.358361084097034,
        required: true,
      },
      y: {
        name: 'y',
        type: 'number',
        example: 127.34540366949406,
        required: true,
      },
      offset: {
        name: 'offset',
        type: 'number',
        example: 0,
        required: false,
      },
      time: {
        name: 'time',
        type: 'string',
        examples: {
          1: {
            summary: '아침&점심',
            value: 'lunch',
          },
          2: {
            summary: '저녁&야식',
            value: 'dinner',
          },
        },
        required: false,
      },
    },
  },
  getUserGroups: {
    operation: {
      summary: '사용자별 이전까지 참여한 모든 그룹 조회 API',
      description: '사용자가 이전까지 참여한 모든 그룹 목록을 조회합니다.',
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
      userId: {
        in: 'path',
        name: 'userId',
        type: 'number',
        example: 1,
        required: true,
      },
    },
    query: {
      offset: {
        name: 'offset',
        type: 'number',
        example: 0,
        required: false,
      },
    },
  },
  getGroupDetail: {
    operation: {
      summary: '그룹 상세 내용 조회 API',
      description: '특정 그룹의 상세 내용을 조회합니다.',
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
      404: {
        status: 404,
        description: '조회 실패',
        // type
      },
    },
    param: {
      groupId: {
        in: 'path',
        name: 'groupId',
        type: 'number',
        example: 1,
        required: true,
      },
    },
  },
  createGroup: {
    operation: {
      summary: '새 그룹 생성 API',
      description: '새로운 그룹을 생성합니다.',
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
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: '그룹 제목',
            example: '퇴근 후 치맥하실분~',
          },
          menu: {
            type: 'string',
            description: '메뉴',
            example: '치맥',
          },
          placeName: {
            type: 'string',
            description: '모임 장소',
            example: '오빠닭 강남점',
          },
          startAt: {
            type: 'date',
            description: '모임 시작일시',
            example: new Date(),
          },
          endAt: {
            type: 'date',
            description: '모임 종료일시',
            example: new Date(),
          },
          limit: {
            type: 'interger',
            description: '인원 제한',
            example: 4,
          },
          locationX: {
            type: 'double',
            description: '카카오맵 좌표(x)',
            example: 36.358361084097034,
          },
          locationY: {
            type: 'double',
            description: '카카오맵 좌표(y)',
            example: 127.34540366949406,
          },
          address: {
            type: 'string',
            description: '상세 주소',
            example: '대전광역시 유성구 봉명동 629-2',
          },
          image: {
            type: 'string',
            description: '그룹 이미지',
            format: 'binary',
          },
        },
      },
    },
  },
  updateGroup: {
    operation: {
      summary: '그룹 세부 내용 수정 API',
      description: '그룹의 세부 내용을 수정합니다.',
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
      404: {
        status: 404,
        description: '조회 실패',
        // type
      },
    },
    param: {
      groupId: {
        in: 'path',
        name: 'groupId',
        type: 'number',
        example: 1,
        required: true,
      },
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: '그룹 제목',
            example: '퇴근 후 치맥하실분~',
          },
          description: {
            type: 'string',
            description: '덧붙일 내용',
            example: '내일 출근이니 가볍게 적실 예정입니다.',
          },
          menu: {
            type: 'string',
            description: '메뉴',
            example: '치맥',
          },
          placeName: {
            type: 'string',
            description: '모임 장소',
            example: '오빠닭 강남점',
          },
          startAt: {
            type: 'date',
            description: '모임 시작일시',
            example: new Date(),
          },
          endAt: {
            type: 'date',
            description: '모임 종료일시',
            example: new Date(),
          },
          limit: {
            type: 'interger',
            description: '인원 제한',
            example: 4,
          },
          locationX: {
            type: 'double',
            description: '카카오맵 좌표(x)',
            example: 36.358361084097034,
          },
          locationY: {
            type: 'double',
            description: '카카오맵 좌표(y)',
            example: 127.34540366949406,
          },
          address: {
            type: 'string',
            description: '상세 주소',
            example: '대전광역시 유성구 봉명동 629-2',
          },
          image: {
            type: 'string',
            description: '그룹 이미지',
            format: 'binary',
          },
        },
      },
    },
  },
  deleteGroup: {
    operation: {
      summary: '그룹 삭제 API',
      description: '그룹을 삭제합니다.',
    },
    param: {
      groupId: {
        in: 'path',
        name: 'groupId',
        type: 'number',
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
      404: {
        status: 404,
        description: '조회 실패',
        // type
      },
    },
  },
  joinOrExit: {
    operation: {
      summary: '그룹 참여 또는 탈퇴 API',
      description: '그룹에 참여하거나, 그룹에서 탈퇴합니다.',
    },
    param: {
      groupId: {
        in: 'path',
        name: 'groupId',
        type: 'number',
        example: 1,
        required: true,
      },
    },
    query: {
      action: {
        name: 'action',
        type: 'string',
        examples: {
          1: {
            summary: '참여',
            value: 'join',
          },
          2: {
            summary: '탈퇴',
            value: 'exit',
          },
        },
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
        description: '잘못된 요청',
        // type
      },
      401: {
        status: 401,
        description: '로그인 필요',
        // type
      },
      404: {
        status: 404,
        description: '조회 실패',
        // type
      },
    },
  },
};
