import { ErrorDto } from 'src/common/dto/error.dto';
import { BlocksDto } from './dto/response/blocks.dto';

export const BlockSwagger = {
  tag: '차단 API',
  getBlocks: {
    operation: {
      summary: '차단 목록 조회 API',
      description: '자신이 차단한 사용자의 목록을 조회합니다.',
    },
    response: {
      200: {
        status: 200,
        description: '성공',
        type: BlocksDto,
      },
      401: {
        status: 401,
        description: '로그인 필요',
        type: ErrorDto,
      },
    },
  },
  blockOrCancel: {
    operation: {
      summary: '차단 또는 취소 API',
      description: '다른 사용자를 차단하거나, 차단 상태를 철회합니다.',
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
        type: null,
      },
      401: {
        status: 401,
        description: '로그인 필요',
        type: ErrorDto,
      },
    },
  },
};
