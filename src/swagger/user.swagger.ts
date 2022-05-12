import { SwaggerSetting, SwaggerProperty } from 'src/common/interface';

export const UserSwagger: SwaggerSetting = {
  tag: '사용자  API',
  operations: {
    getMyProfile: {
      summary: '내 프로필 조회 API',
      description: '나의 프로필 정보를 조회합니다.',
    },
    getOtherProfile: {
      summary: '다른 사용자 프로필 조회 API',
      description: '다른 사용자 정보를 조회합니다.',
    },
    editMyProfile: {
      summary: '내 프로필 수정 API',
      description: '내 프로필 정보를 수정합니다.',
    },
    getUserFollowings: {
      summary: '사용자의 팔로잉 또는 팔로워 목록 조회 API',
      description: '사용자의 팔로잉/팔로워 목록을 조회합니다.',
    },
    followingOtherOrCancel: {
      summary: '다른 사용자 팔로잉 또는 취소 API',
      description: '다른 사용자를 팔로잉하거나, 팔로잉한 상태를 취소합니다.',
    },
    getUserBlocks: {
      summary: '나의 차단 목록 조회 API',
      description: '내가 차단한 사용자의 목록을 조회합니다.',
    },
    blockOtherOrCancel: {
      summary: '다른 사용자 차단/취소 API',
      description: '다른 사용자를 차단하거나, 차단 상태를 해제합니다.',
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
    otherId: {
      in: 'path',
      name: 'otherId',
      type: 'int',
      required: false,
      example: '1',
    },
  },
  query: {
    filter: {
      in: 'query',
      name: 'filter',
      type: 'string',
      required: true,
      example: 'following',
      description: '`following`: 팔로잉 목록 / `follower`: 팔로워 목록',
    },
  },
};

export const UserDtoSwagger: SwaggerProperty = {
  nickname: {
    example: 'welcome_',
  },
  profileImageUrl: {
    example:
      'https://postfiles.pstatic.net/MjAyMDAyMTBfODAg/MDAxNTgxMzA0MTE3ODMy.ACRLtB9v5NH-I2qjWrwiXLb7TeUiG442cJmcdzVum7cg.eTLpNg_n0rAS5sWOsofRrvBy0qZk_QcWSfUiIagTfd8g.JPEG.lattepain/1581304118739.jpg',
  },
  careerId: {
    example: 1,
  },
  year: {
    example: '신입',
  },
  description: {
    example: '신입 백엔드 개발자 입니다.',
  },
};
