import { Test } from '@nestjs/testing';
import { FollowService } from 'src/follow/follow.service';
import { FollowRepository } from 'src/follow/follow.repository';
import { UserRepository } from 'src/user/user.repository';
import { FollowException } from 'src/follow/follow.exception';
import { Follow } from 'src/follow/follow.entity';

const mockFollowRepository = {
  findOne: jest.fn(),
  findFollowings: jest.fn(),
  findFollowers: jest.fn(),
  findFollow: jest.fn(),
  follow: jest.fn(),
  cancel: jest.fn(),
  followCancelTransaction: jest.fn(),
};

const mockUserRepository = {
  findOne: jest.fn(),
};

const mockFollowException = {
  NotFound: jest.fn(),
  AreYouTired: jest.fn(),
};

type MockFollowRepository = Partial<Record<keyof FollowRepository, jest.Mock>>;
type MockUserRepository = Partial<Record<keyof UserRepository, jest.Mock>>;

describe('FollowService', () => {
  let service: FollowService;
  let followRepository: MockFollowRepository;
  let userRepository: MockUserRepository;
  let followException;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        FollowService,
        {
          provide: FollowRepository,
          useValue: mockFollowRepository,
        },
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: FollowException,
          useValue: mockFollowException,
        },
      ],
    }).compile();

    service = module.get<FollowService>(FollowService);
    followRepository = module.get(FollowRepository);
    userRepository = module.get(UserRepository);
    followException = module.get(FollowException);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 팔로잉 목록 조회
  describe('getFollowings', () => {
    it('유저의 id가 주어지면 유저의 팔로잉 목록을 반환한다.', async () => {
      const userId = 'userId';
      const followingUser = {
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

      const findFollowings = jest
        .spyOn(followRepository, 'findFollowings')
        .mockResolvedValue([followingUser]);
      const result = await service.getFollowings(userId);

      expect(findFollowings).toBeCalled();
      expect(result.users[0].userId).toEqual(followingUser.otherId.userId);
    });
  });

  // 팔로워 목록 조회
  describe('getFollowers', () => {
    it('유저의 id가 주어지면 유저의 팔로워 목록을 반환한다.', async () => {
      const userId = 'userId';
      const followerUser = {
        userId: {
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

      const findFollowers = jest
        .spyOn(followRepository, 'findFollowers')
        .mockResolvedValue([followerUser]);
      const result = await service.getFollowers(userId);

      expect(findFollowers).toBeCalled();
      expect(result.users[0].userId).toEqual(followerUser.userId.userId);
    });
  });

  // 팔로잉 또는 팔로잉 상태 철회
  describe('followOrCancel', () => {
    it('생성되지 않은 유저의 id가 주어진다면 유저를 찾을 수 없다는 예외를 던진다', async () => {
      const userId = 'Alonerz';
      const otherId = 'HangHae';

      jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);

      const result = async () => {
        await service.followOrCancel(userId, otherId);
      };

      await expect(result).rejects.toThrowError(followException.NotFound());
    });

    it('자기 자신을 팔로우하면 불가능하다는 예외를 던진다.', async () => {
      const userId = 'userId';
      const otherId = 'userId';

      const result = async () => {
        await service.followOrCancel(userId, otherId);
      };

      await expect(result).rejects.toThrowError(followException.AreYouTired());
    });

    it('다른 사용자를 팔로잉한다.', async () => {
      const userId = 'userId';
      const otherId = 'otherId';

      const userRepositoryFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue({
          userId: 'userId',
        });
      const findFollow = jest
        .spyOn(followRepository, 'findFollow')
        .mockResolvedValue(undefined);
      const follow = jest.spyOn(followRepository, 'follow');

      await service.followOrCancel(userId, otherId);

      expect(userRepositoryFindOneSpy).toBeCalled();
      expect(findFollow).toBeCalled();
      expect(follow).toBeCalled();
    });

    it('다른 사용자를 팔로잉 철회한다.', async () => {
      const userId = 'userId';
      const otherId = 'otherId';

      const userRepositoryFindOneSpy = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue({
          userId: 'userId',
        });
      const findFollow = jest
        .spyOn(followRepository, 'findFollow')
        .mockResolvedValue(Follow);
      const cancel = jest.spyOn(followRepository, 'cancel');

      await service.followOrCancel(userId, otherId);

      expect(userRepositoryFindOneSpy).toBeCalled();
      expect(findFollow).toBeCalled();
      expect(cancel).toBeCalled();
    });
  });
});
