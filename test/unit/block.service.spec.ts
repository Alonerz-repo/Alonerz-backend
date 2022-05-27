import { Test } from '@nestjs/testing';
import { Connection } from 'typeorm';
import { BlockService } from 'src/block/block.service';
import { BlockRepository } from 'src/block/block.repository';
import { UserRepository } from 'src/user/user.repository';
import { FollowRepository } from 'src/follow/follow.repository';
import { BlockException } from 'src/block/block.exception';
import { Block } from 'src/block/block.entity';

const mockBlockRepository = {
  findOne: jest.fn(),
  findBlockUserId: jest.fn(),
  findBlockUsers: jest.fn(),
  findBlock: jest.fn(),
  blockDoneTransaction: jest.fn(),
  blockCancelTransaction: jest.fn(),
};

const mockUserRepository = {
  findOne: jest.fn(),
};

const mockFollowRepository = {
  followCancelTransaction: jest.fn(),
};

const mockBlockException = {
  NotFound: jest.fn(),
  AreYouTired: jest.fn(),
};

const mockConnection = {
  transaction: jest.fn(),
  createQueryRunner: () => ({
    connect: jest.fn(),
    startTransaction: jest.fn(),
    commitTransaction: jest.fn(),
    rollbackTransaction: jest.fn(),
    release: jest.fn(),
    manager: {
      save: (r) => r,
      update: (r) => r,
      delete: (r) => r,
    },
  }),
};

type MockBlockRepository = Partial<Record<keyof BlockRepository, jest.Mock>>;
type MockUserRepository = Partial<Record<keyof UserRepository, jest.Mock>>;
type MockFollowRepository = Partial<Record<keyof FollowRepository, jest.Mock>>;

describe('BlockService', () => {
  let service: BlockService;
  let blockRepository: MockBlockRepository;
  let userRepository: MockUserRepository;
  let followRepository: MockFollowRepository;
  let blockException;
  let connection;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        BlockService,
        {
          provide: BlockRepository,
          useValue: mockBlockRepository,
        },
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: FollowRepository,
          useValue: mockFollowRepository,
        },
        {
          provide: BlockException,
          useValue: mockBlockException,
        },
        {
          provide: Connection,
          useValue: mockConnection,
        },
      ],
    }).compile();

    service = module.get<BlockService>(BlockService);
    blockRepository = module.get(BlockRepository);
    userRepository = module.get(UserRepository);
    followRepository = module.get(FollowRepository);
    blockException = module.get(BlockException);
    connection = module.get<Connection>(Connection);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 자신의 차단 목록 조회
  describe('findBlocks', () => {
    it('유저의 id가 주어진다면 해당 id의 차단 목록을 반환한다.', async () => {
      const userId = 'userId';
      const blockUser = {
        otherId: {
          userId: 'userId',
          nickname: 'nickname',
          profileImageUrl: 'profileImageUrl',
          characterImageId: 1,
          careerId: 1,
          yearId: 1,
          description: 'description',
          point: [1, 2, 3],
        },
      };
      const blockRepositoryFindSpy = jest
        .spyOn(blockRepository, 'findBlockUsers')
        .mockResolvedValue([blockUser]);

      const result = await service.findBlocks(userId);

      expect(blockRepositoryFindSpy).toBeCalled();
      expect(result.users[0].userId).toEqual(blockUser.otherId.userId);
    });
  });

  // 다른 사용자 차단 또는 철회
  describe('blockOrCancel', () => {
    it('생성되지 않은 유저의 id가 주어진다면 유저를 찾을 수 없다는 예외를 던진다', async () => {
      const userId = 'Alonerz';
      const otherId = 'HangHae';
      jest.spyOn(blockRepository, 'findOne').mockResolvedValue(false);

      const result = async () => {
        await service.blockOrCancel(userId, otherId);
      };

      await expect(result).rejects.toThrowError(blockException.NotFound());
    });

    it('자기 자신을 차단하면 불가능하다는 예외를 던진다.', async () => {
      const userId = 'userId';
      const otherId = 'userId';

      const result = async () => {
        await service.blockOrCancel(userId, otherId);
      };

      await expect(result).rejects.toThrowError(blockException.AreYouTired());
    });

    it('다른 사용자를 차단 한다.', async () => {
      const userId = 'userId';
      const otherId = 'otherId';

      const userRepositoryFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue({
          userId: 'userId',
        });
      const blockRepositoryFindBlockSpy = jest
        .spyOn(blockRepository, 'findBlock')
        .mockResolvedValue(Block);
      const blockCancelTransaction = jest.spyOn(
        blockRepository,
        'blockCancelTransaction',
      );
      await service.blockOrCancel(userId, otherId);

      expect(userRepositoryFindOneSpy).toBeCalled();
      expect(blockRepositoryFindBlockSpy).toBeCalled();
      expect(blockCancelTransaction).toBeCalled();
    });
  });

  it('다른 사용자를 차단 철회한다.', async () => {
    const userId = 'userId';
    const otherId = 'otherId';

    const userRepositoryFindOneSpy = jest
      .spyOn(userRepository, 'findOne')
      .mockResolvedValue({
        userId: 'userId',
      });
    const blockRepositoryFindBlockSpy = jest
      .spyOn(blockRepository, 'findBlock')
      .mockResolvedValue(undefined);
    const blockDoneTransaction = jest.spyOn(
      blockRepository,
      'blockDoneTransaction',
    );
    const followCancelTransaction = jest.spyOn(
      followRepository,
      'followCancelTransaction',
    );
    await service.blockOrCancel(userId, otherId);

    expect(userRepositoryFindOneSpy).toBeCalled();
    expect(blockRepositoryFindBlockSpy).toBeCalled();
    expect(blockDoneTransaction).toBeCalled();
    expect(followCancelTransaction).toBeCalled();
  });
});
