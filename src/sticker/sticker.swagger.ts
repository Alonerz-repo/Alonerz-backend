import { ErrorDto } from 'src/common/dto/error.dto';
import { CreatedStickerDto } from './dto/response/created-sticker.dto';
import { SelectedStickersDto } from './dto/response/selected-stickers.dto';

export const StickerSwagger = {
  tag: '스티커 API',
  getStickers: {
    operation: {
      summary: '사용자의 모든 스티커 조회 API',
      description: '사용자의 모든 스티커 정보를 조회합니다.',
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
    response: {
      200: {
        status: 200,
        description: '성공',
        type: SelectedStickersDto,
      },
    },
  },
  createSticker: {
    operation: {
      summary: '스티커 입력 API',
      description: '스티커 정보를 입력합니다.',
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          stickerImageId: {
            type: 'number',
            description: '스티커 이미지 URL id',
            example: 0,
          },
          stickerOrder: {
            type: 'number',
            description: '스티커 위치',
            example: 0,
          },
        },
      },
    },
    response: {
      201: {
        status: 201,
        description: '성공',
        type: CreatedStickerDto,
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
  updateSticker: {
    operation: {
      summary: '스티커 수정 API',
      description: '스티커 정보를 수정합니다.',
    },
    param: {
      stickerId: {
        in: 'path',
        name: 'stickerId',
        type: 'number',
        example: 0,
        required: true,
      },
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          stickerImageId: {
            type: 'number',
            description: '스티커 이미지 URL id',
            example: 0,
            require: false,
          },
          stickerOrder: {
            type: 'number',
            description: '스티커 위치',
            example: 0,
            require: false,
          },
        },
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
      404: {
        status: 404,
        description: '조회 실패',
        type: ErrorDto,
      },
    },
  },
  deleteSticker: {
    operation: {
      summary: '스티커 삭제 API',
      description: '스티커 정보를 삭제합니다.',
    },
    param: {
      stickerId: {
        in: 'path',
        name: 'stickerId',
        type: 'number',
        example: 0,
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
      404: {
        status: 404,
        description: '조회 실패',
        type: ErrorDto,
      },
    },
  },
};
