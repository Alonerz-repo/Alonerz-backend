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
type MockBlockException = Partial<Record<keyof BlockException, jest.Mock>>;

describe('BlockService', () => {
  let service: BlockService;
  let blockRepository: MockBlockRepository;
  let userRepository: MockUserRepository;
  let followRepository: MockFollowRepository;
  let blockException: MockBlockException;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ????????? ?????? ?????? ??????
  describe('findBlocks', () => {
    it('????????? id??? ??????????????? ?????? id??? ?????? ????????? ????????????.', async () => {
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

  // ?????? ????????? ?????? ?????? ??????
  describe('blockOrCancel', () => {
    it('???????????? ?????? ????????? id??? ??????????????? ????????? ?????? ??? ????????? ????????? ?????????', async () => {
      const userId = 'Alonerz';
      const otherId = 'HangHae';
      jest.spyOn(blockRepository, 'findOne').mockResolvedValue(false);

      const result = async () => {
        await service.blockOrCancel(userId, otherId);
      };

      await expect(result).rejects.toThrowError(blockException.NotFound());
    });

    it('?????? ????????? ???????????? ?????????????????? ????????? ?????????.', async () => {
      const userId = 'userId';
      const otherId = 'userId';

      const result = async () => {
        await service.blockOrCancel(userId, otherId);
      };

      await expect(result).rejects.toThrowError(blockException.AreYouTired());
    });

    it('?????? ???????????? ?????? ??????.', async () => {
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

  it('?????? ???????????? ?????? ????????????.', async () => {
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
