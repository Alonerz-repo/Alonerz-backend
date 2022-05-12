import { SwaggerSetting, SwaggerProperty } from 'src/common/interface';

export const GroupSwagger: SwaggerSetting = {
  tag: '그룹 API',
  operations: {
    getTodayGroups: {
      summary: '나의 오늘 참여 그룹 목록 조회 API',
    },
    getGroupsByQuery: {
      summary: '조건부 그룹 목록 조회 API',
    },
    getUserGroups: {
      summary: '사용자의 모든 참여 그룹 목록 조회 API',
    },
    findGroup: {
      summary: '그룹 상세 정보 조회 API',
    },
    createGroup: {
      summary: '새 그룹 생성 API',
    },
    updateGroup: {
      summary: '그룹 정보 수정 API',
    },
    deleteGroup: {
      summary: '그룹 삭제 API',
    },
    joinOrExitGroup: {
      summary: '그룹 참여 및 탈퇴 API',
    },
  },
  param: {
    userId: {
      in: 'path',
      name: 'userId',
      type: 'int',
      required: false,
      example: '1',
    },
    groupId: {
      in: 'path',
      name: 'groupId',
      type: 'int',
      required: false,
      example: '1',
    },
  },
  query: {
    x: {
      in: 'query',
      name: 'x',
      type: 'number',
      example: '36.358361084097034',
    },
    y: {
      in: 'query',
      name: 'y',
      type: 'number',
      example: '127.34540366949406',
    },
    when: {
      in: 'query',
      name: 'when',
      type: 'string',
      required: false,
      example: 'lanch',
    },
    action: {
      in: 'query',
      name: 'action',
      type: 'join | exit',
      required: false,
      example: 'join',
    },
    offset: {
      in: 'query',
      name: 'offset',
      type: 'int',
      required: false,
      example: undefined,
    },
  },
};

export const GroupDtoSwagger: SwaggerProperty = {
  title: {
    example: '퇴근 후 육회드시러 가실 백엔드 개발자 모집합니다.',
  },
  menu: {
    example: '육회',
  },
  description: {
    example: 'DM으로 연락처 공유드리겠습니다.',
  },
  placeName: {
    example: '육사구이 봉명점',
  },
  startAt: {
    example: new Date(),
  },
  endAt: {
    example: new Date(),
  },
  limit: {
    example: 3,
  },
  imageUrl: {
    required: false,
    default: undefined,
    example:
      'https://github.com/choewy/react-place-app/blob/master/src/images/0.png?raw=true',
  },
  locationX: {
    example: 36.358361084097034,
  },
  locationY: {
    example: 127.34540366949406,
  },
  address: {
    example: '대전광역시 유성구 봉명동 629-2',
  },
};
