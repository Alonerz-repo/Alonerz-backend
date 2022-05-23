import { ErrorDto } from 'src/common/dto/error.dto';
import { CreatedGroupDto } from './dto/response/created-group.dto';
import { GroupDetailDto } from './dto/response/group-detail.dto';
import { SelectGroupsDto } from './dto/response/select-groups.dto';

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
        type: SelectGroupsDto,
      },
      401: {
        status: 401,
        description: '로그인 필요',
        type: ErrorDto,
      },
      403: {
        status: 403,
        description: '토큰 만료',
        type: ErrorDto,
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
        type: SelectGroupsDto,
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
        type: SelectGroupsDto,
      },
      401: {
        status: 401,
        description: '로그인 필요',
        type: ErrorDto,
      },
      403: {
        status: 403,
        description: '토큰 만료',
        type: ErrorDto,
      },
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
        type: GroupDetailDto,
      },
      401: {
        status: 401,
        description: '로그인 필요',
        type: ErrorDto,
      },
      403: {
        status: 403,
        description: '토큰 만료',
        type: ErrorDto,
      },
      404: {
        status: 404,
        description: '조회 실패',
        type: ErrorDto,
      },
    },
    param: {
      groupId: {
        in: 'path',
        name: 'groupId',
        type: 'string',
        example: '050b9744-b833-4c49-b35a-c9c7e631c2e2',
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
        type: CreatedGroupDto,
      },
      400: {
        status: 400,
        description: '잘못된 입력',
        type: ErrorDto,
      },
      401: {
        status: 401,
        description: '로그인 필요',
        type: ErrorDto,
      },
      403: {
        status: 403,
        description: '토큰 만료',
        type: ErrorDto,
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
        type: null,
      },
      400: {
        status: 400,
        description: '잘못된 입력',
        type: ErrorDto,
      },
      401: {
        status: 401,
        description: '로그인 필요',
        type: ErrorDto,
      },
      403: {
        status: 403,
        description: '토큰 만료',
        type: ErrorDto,
      },
      404: {
        status: 404,
        description: '조회 실패',
        type: ErrorDto,
      },
    },
    param: {
      groupId: {
        in: 'path',
        name: 'groupId',
        type: 'string',
        example: '050b9744-b833-4c49-b35a-c9c7e631c2e2',
        required: true,
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
        type: 'string',
        example: '050b9744-b833-4c49-b35a-c9c7e631c2e2',
        required: true,
      },
    },
    response: {
      200: {
        status: 200,
        description: '성공',
        type: null,
      },
      401: {
        status: 401,
        description: '로그인 필요',
        type: ErrorDto,
      },
      403: {
        status: 403,
        description: '토큰 만료',
        type: ErrorDto,
      },
      404: {
        status: 404,
        description: '조회 실패',
        type: ErrorDto,
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
        type: 'string',
        example: '050b9744-b833-4c49-b35a-c9c7e631c2e2',
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
        type: null,
      },
      400: {
        status: 400,
        description: '잘못된 요청',
        type: ErrorDto,
      },
      401: {
        status: 401,
        description: '로그인 필요',
        type: ErrorDto,
      },
      403: {
        status: 403,
        description: '토큰 만료',
        type: ErrorDto,
      },
      404: {
        status: 404,
        description: '조회 실패',
        type: ErrorDto,
      },
    },
  },
};
