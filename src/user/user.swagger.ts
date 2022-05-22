import { ErrorDto } from 'src/common/dto/error.dto';
import { SelectBoardDto } from './dto/response/select-board.dto';
import { SelectProfileDto } from './dto/response/select-profile.dto';
import { SelectUserDto } from './dto/response/select-user.dto';

export const UserSwagger = {
  tag: '사용자 API',
  getUser: {
    operation: {
      summary: '사용자 메인 페이지 정보 조회 API',
      description: '사용자의 메인 페이지의 정보를 조회합니다.',
    },
    response: {
      200: {
        status: 200,
        description: '성공',
        type: SelectUserDto,
      },
      401: {
        status: 401,
        description: '로그인 필요',
        type: ErrorDto,
      },
      404: {
        status: 404,
        description: '사용자 없음',
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
  },
  getProfile: {
    operation: {
      summary: '사용자 프로필 페이지 정보 조회 API',
      description:
        '사용자의 프로필 정보(프로필 이미지, 닉네임, 커리어, 연차, 한 줄 소개)를 조회합니다.',
    },
    response: {
      200: {
        status: 200,
        description: '성공',
        type: SelectProfileDto,
      },
      401: {
        status: 401,
        description: '로그인 필요',
        type: ErrorDto,
      },
      404: {
        status: 404,
        description: '사용자 없음',
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
  },
  getBoard: {
    operation: {
      summary: '사용자 보드 페이지 정보 조회 API',
      description: '사용자의 보드 정보(스티커, 캐릭터, 배경화면)를 조회합니다.',
    },
    response: {
      200: {
        status: 200,
        description: '성공',
        type: SelectBoardDto,
      },
      401: {
        status: 401,
        description: '로그인 필요',
        type: ErrorDto,
      },
      404: {
        status: 404,
        description: '사용자 없음',
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
  },
  updateProfile: {
    operation: {
      summary: '프로필 정보 수정 API',
      description: '자신의 프로필 정보를 수정합니다.',
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
        type: ErrorDto,
      },
      401: {
        status: 401,
        description: '로그인 필요',
        type: ErrorDto,
      },
    },
  },
  updateProfileImage: {
    operation: {
      summary: '프로필 이미지 수정 API',
      description: '자신의 프로필 이미지를 수정합니다.',
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          image: {
            type: 'string',
            description: '그룹 이미지',
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
        type: ErrorDto,
      },
      401: {
        status: 401,
        description: '로그인 필요',
        type: ErrorDto,
      },
    },
  },
  deleteProfileImage: {
    operation: {
      summary: '프로필 이미지 삭제 API',
      description: '자신의 프로필 이미지를 삭제합니다.',
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
    },
  },
  updateBoard: {
    operation: {
      summary: '보드 수정 API',
      description: '자신의 보드(캐릭터, 배경색상)을 수정합니다.',
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
    },
  },
};
