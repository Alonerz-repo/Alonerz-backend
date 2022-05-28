import { Test } from '@nestjs/testing';
import { DeleteResult } from 'typeorm';
import { AuthException } from 'src/auth/auth.exception';
import { AuthRepository } from 'src/auth/auth.repository';
import { AuthService } from 'src/auth/auth.service';
import { TokenRepository } from 'src/token/token.repository';
import { User } from 'src/user/user.entity';
import { PayloadDto } from 'src/auth/dto/response/payload.dto';
import { CreatedTokensDto } from 'src/auth/dto/response/created-tokens.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

const mockAuthRepository = {
  findOne: jest.fn(),
  findUserByUserId: jest.fn(),
  findUserByKakaoId: jest.fn(),
  createUser: jest.fn(),
  restoreUser: jest.fn(),
  deleteUser: jest.fn(),
};

const mockTokenRepository = {
  saveToken: jest.fn(),
  updateToken: jest.fn(),
  deleteToken: jest.fn(),
};

const mockAuthException = {
  NotFound: jest.fn(),
  InvalidToken: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
  decode: jest.fn(),
};

const mockConfigService = {
  get: jest.fn(),
};

type MockAuthRepository = Partial<Record<keyof AuthRepository, jest.Mock>>;
type MockTokenRepository = Partial<Record<keyof TokenRepository, jest.Mock>>;
type MockAuthException = Partial<Record<keyof AuthException, jest.Mock>>;

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: MockAuthRepository;
  let tokenRepository: MockTokenRepository;
  let authException: MockAuthException;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: AuthRepository,
          useValue: mockAuthRepository,
        },
        {
          provide: TokenRepository,
          useValue: mockTokenRepository,
        },
        {
          provide: AuthException,
          useValue: mockAuthException,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    authRepository = module.get(AuthRepository);
    tokenRepository = module.get(TokenRepository);
    authException = module.get(AuthException);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 페이로드 조회
  describe('getPayload', () => {
    it('생성되지 않은 유저의 id가 주어진다면 유저를 찾을 수 없다는 예외를 던진다', async () => {
      const userId = 'userId';
      jest
        .spyOn(authRepository, 'findUserByUserId')
        .mockResolvedValue(undefined);

      const result = async () => {
        await service.getPayload(userId);
      };

      await expect(result).rejects.toThrowError(authException.NotFound());
    });

    it('생성된 유저의 id가 주어진다면 해당 id의 유저를 반환한다', async () => {
      const userId = 'abc';

      const findUserByUserId = jest
        .spyOn(authRepository, 'findUserByUserId')
        .mockResolvedValue(User);

      const result = await service.getPayload(userId);

      expect(findUserByUserId).toBeCalled();
      expect(result).toBeInstanceOf(PayloadDto);
    });
  });

  // 로그인(최초 로그인 시 회원가입 처리)
  describe('loginOrSignup', () => {
    it('로그인 시 로그인 처리를 한다.', async () => {
      const kakaoId = 'kakaoId';
      const findUserByKakaoId = jest
        .spyOn(authRepository, 'findUserByKakaoId')
        .mockResolvedValue({ userId: 'userId' });
      const saveToken = jest.spyOn(tokenRepository, 'saveToken');

      const result = await service.loginOrSignup(kakaoId);

      expect(findUserByKakaoId).toBeCalled();
      expect(saveToken).toBeCalled();
      expect(result).toBeInstanceOf(CreatedTokensDto);
    });

    it('로그인 시 회원가입 처리를 한다.', async () => {
      const kakaoId = 'kakaoId';
      const findUserByKakaoId = jest
        .spyOn(authRepository, 'findUserByKakaoId')
        .mockResolvedValue(undefined);
      const restoreUser = jest
        .spyOn(authRepository, 'createUser')
        .mockResolvedValue({ userId: 'userId' });
      const saveToken = jest.spyOn(tokenRepository, 'saveToken');

      const result = await service.loginOrSignup(kakaoId);

      expect(findUserByKakaoId).toBeCalled();
      expect(restoreUser).toBeCalled();
      expect(saveToken).toBeCalled();
      expect(result).toBeInstanceOf(CreatedTokensDto);
    });
  });

  // 토큰 갱신
  describe('reissueTokens', () => {
    it('accessToken에 userId가 존재하지 않으면 로그인이 필요하다는 예외를 던진다', async () => {
      const authorization = '';
      const refreshToken = '';

      const result = async () => {
        await service.reissueTokens(authorization, refreshToken);
      };

      await expect(result).rejects.toThrowError(authException.InvalidToken());
    });

    it('accessToken에 userId가 생성되지 않은 유저의 id면 유저를 찾을 수 없다는 예외를 던진다', async () => {
      const authorization = 'authorization accessToken';
      const refreshToken = 'refreshToken';

      jest
        .spyOn(authRepository, 'findUserByUserId')
        .mockResolvedValue(undefined);

      const result = async () => {
        await service.reissueTokens(authorization, refreshToken);
      };

      await expect(result).rejects.toThrowError(authException.NotFound());
    });
  });

  // 로그아웃(accessToken 삭제)
  describe('logout', () => {
    it('로그아웃 시 유저의 accessToken을 삭제한다.', async () => {
      const userId = 'abc';
      const tokenRepositoryDeleteSpy = jest
        .spyOn(tokenRepository, 'deleteToken')
        .mockResolvedValue({} as DeleteResult);

      await tokenRepository.deleteToken(userId);

      expect(tokenRepositoryDeleteSpy).toHaveBeenCalledWith(userId);
    });
  });
});
