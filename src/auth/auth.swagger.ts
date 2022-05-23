import { ErrorDto } from 'src/common/dto/error.dto';
import { CreatedTokensDto } from './dto/response/created-tokens.dto';
import { PayloadDto } from './dto/response/payload.dto';
import { ReissuedTokensDto } from './dto/response/reissued-tokens.dto';

export const AuthSwagger = {
  tag: '사용자 인증 API',
  auth: {
    operation: {
      summary: '사용자 인가 확인 API',
      description: '자신의 프로필 정보를 조회합니다.',
    },
    response: {
      200: {
        status: 200,
        description: '성공',
        type: PayloadDto,
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
  kakaoRedirect: {
    operation: {
      summary: '카카오 로그인 Redirect URL',
      description:
        'Kakao Server로부터 사용자의 정보를 받아오기 위한 Redirect URL 입니다.',
      deprecated: true,
    },
    response: {
      304: {
        status: 304,
        description: 'Redirect',
        type: null,
      },
      401: {
        status: 401,
        description: 'Kakao 인증 실패',
        type: ErrorDto,
      },
    },
  },
  login: {
    operation: {
      summary: '사용자 로그인 또는 회원가입 API',
      description: '서비스 자체 로그인 또는 회원가입을 합니다.',
    },
    response: {
      201: {
        status: 201,
        description: '성공',
        type: CreatedTokensDto,
      },
    },
  },
  reissue: {
    operation: {
      summary: '토큰 갱신 API',
      description:
        '사용자 인가 확인 시 토큰이 만료된 경우 신규 토큰 재발급을 요청할 수 있습니다.',
    },
    response: {
      201: {
        status: 201,
        description: '성공',
        type: ReissuedTokensDto,
      },
      401: {
        status: 401,
        description: '로그인 필요',
        type: ErrorDto,
      },
    },
  },
  logout: {
    operation: {
      summary: '로그아웃 API',
      description:
        'DB에서 사용자의 토큰을 삭제하여 안전하게 로그아웃할 수 있습니다.',
    },
    response: {
      200: {
        status: 200,
        description: '성공',
        type: null,
      },
    },
  },
  unlink: {
    operation: {
      summary: '계정 탈퇴 API',
      description: '카카오 계정 연결을 해제하고, 서비스의 계정을 삭제합니다.',
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
