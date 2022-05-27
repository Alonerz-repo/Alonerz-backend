import { Test } from '@nestjs/testing';
import { DeleteResult, UpdateResult } from 'typeorm';
import { GroupService } from 'src/group/group.service';
import { GroupRepository } from 'src/group/group.repository';
import { GroupUserRepository } from 'src/groupuser/groupuser.repository';
import { GroupException } from 'src/group/group.exception';
import { CreateGroupDto } from 'src/group/dto/request/create-group.dto';
import { Readable } from 'node:stream';
import { UpdateGroupDto } from 'src/group/dto/request/update-group.dto';
import { Group } from 'src/group/group.entity';
import { SelectGroupsDto } from 'src/group/dto/response/select-groups.dto';
import { GroupAction } from 'src/common/interface';

const mockGroupRepository = {
  findOne: jest.fn(),
  findGroupHost: jest.fn(),
  createGroup: jest.fn(),
  updateGroup: jest.fn(),
  deleteGroup: jest.fn(),
  findGroupInfo: jest.fn(),
  findTodayGroups: jest.fn(),
  findGroupsByQuery: jest.fn(),
  findGroupsByUserId: jest.fn(),
};

const mockGroupUserRepository = {
  save: jest.fn(),
  softDelete: jest.fn(),
};

const mockGroupException = {
  NotFound: jest.fn(),
  AccessDenined: jest.fn(),
  BadRequest: jest.fn(),
  YouAreHost: jest.fn(),
};

type MockGroupRepository = Partial<Record<keyof GroupRepository, jest.Mock>>;
type MockGroupUserRepository = Partial<
  Record<keyof GroupUserRepository, jest.Mock>
>;

describe('GroupService', () => {
  let service: GroupService;
  let groupRepository: MockGroupRepository;
  let groupUserRepository: MockGroupUserRepository;
  let groupException;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GroupService,
        {
          provide: GroupRepository,
          useValue: mockGroupRepository,
        },
        {
          provide: GroupUserRepository,
          useValue: mockGroupUserRepository,
        },
        {
          provide: GroupException,
          useValue: mockGroupException,
        },
      ],
    }).compile();

    service = module.get<GroupService>(GroupService);
    groupRepository = module.get(GroupRepository);
    groupUserRepository = module.get(GroupUserRepository);
    groupException = module.get(GroupException);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const image: Express.MulterS3.File = {
    bucket: '',
    key: '',
    acl: '',
    contentType: '',
    contentDisposition: null,
    storageClass: '',
    serverSideEncryption: null,
    metadata: undefined,
    location: '',
    etag: '',
    fieldname: '',
    originalname: '',
    encoding: '',
    mimetype: '',
    size: 0,
    stream: new Readable(),
    destination: '',
    filename: '',
    path: '',
    buffer: undefined,
  };

  // 새 그룹 추가
  describe('createGroup', () => {
    it('새 그룹을 추가한다.', async () => {
      const userId = 'userId';
      const createGroupDto: CreateGroupDto = {
        title: 'title',
        categoryId: 0,
        description: 'description',
        placeName: 'place',
        startAt: undefined,
        endAt: undefined,
        limit: 3,
        locationX: 0,
        locationY: 0,
        address: 'address',
      };
      jest.spyOn(groupRepository, 'createGroup').mockResolvedValue('groupId');

      const result = await service.createGroup(userId, image, createGroupDto);

      expect(result.groupId).toEqual('groupId');
    });
  });

  // 그룹 정보 수정
  describe('updateGroup', () => {
    it('자신이 작성하지 않은 그룹을 수정하려면 권한이 없다는 예외를 던진다', async () => {
      const userId = 'userId';
      const groupId = 'groupId';
      const updateGroupDto: UpdateGroupDto = {
        title: 'updateTitle',
        categoryId: 0,
        description: 'description',
        placeName: 'place',
        startAt: undefined,
        endAt: undefined,
        limit: 3,
        locationX: 0,
        locationY: 0,
        address: 'address',
      };
      jest.spyOn(groupRepository, 'findOne').mockResolvedValue(undefined);

      await service.updateGroup(userId, groupId, image, updateGroupDto);

      expect(groupException.AccessDenined).toBeCalled();
    });

    it('그룹 정보를 수정한다.', async () => {
      const userId = 'userId';
      const groupId = 'groupId';
      const updateGroupDto: UpdateGroupDto = {
        title: 'updateTitle',
        categoryId: 0,
        description: 'description',
        placeName: 'place',
        startAt: undefined,
        endAt: undefined,
        limit: 3,
        locationX: 0,
        locationY: 0,
        address: 'address',
      };
      const groupRepositoryFindOneSpy = jest
        .spyOn(groupRepository, 'findOne')
        .mockResolvedValue(Group);
      const groupRepositoryUpdateSpy = jest
        .spyOn(groupRepository, 'updateGroup')
        .mockResolvedValue({} as UpdateResult);

      await service.updateGroup(userId, groupId, image, updateGroupDto);

      expect(groupRepositoryFindOneSpy).toBeCalled();
      expect(groupRepositoryUpdateSpy).toHaveBeenCalledWith(
        groupId,
        image.location,
        updateGroupDto,
      );
    });
  });

  // 그룹 삭제
  describe('deleteGroup', () => {
    it('자신이 작성하지 않은 그룹을 삭제하려면 권한이 없다는 예외를 던진다.', async () => {
      const userId = 'userId';
      const groupId = 'groupId';

      jest.spyOn(groupRepository, 'findOne').mockResolvedValue(undefined);

      await service.deleteGroup(userId, groupId);

      expect(groupException.AccessDenined).toBeCalled();
    });

    it('그룹을 삭제한다.', async () => {
      const userId = 'userId';
      const groupId = 'groupId';

      const groupRepositoryFindOneSpy = jest
        .spyOn(groupRepository, 'findOne')
        .mockResolvedValue(Group);
      const groupRepositoryDeleteSpy = jest
        .spyOn(groupRepository, 'deleteGroup')
        .mockResolvedValue({} as DeleteResult);

      await service.deleteGroup(userId, groupId);

      expect(groupRepositoryFindOneSpy).toBeCalled();
      expect(groupRepositoryDeleteSpy).toHaveBeenCalledWith(groupId);
    });
  });

  // 오늘 참여 그룹 목록 조회
  describe('getTodayGroups', () => {
    it('유저의 id가 주어진다면 해당 id의 오늘 참여 그룹 목록을 반환한다.', async () => {
      const userId = 'userId';
      const group: Group = {
        groupId: 'groupId',
        title: 'title',
        categoryId: 0,
        placeName: 'placeName',
        description: 'description',
        imageUrl: 'imageUrl',
        startAt: undefined,
        endAt: undefined,
        limit: 0,
        locationX: 0.0,
        locationY: 0.0,
        address: 'address',
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
        host: 'host',
        guests: [],
        comments: [],
      };

      const findTodayGroups = jest
        .spyOn(groupRepository, 'findTodayGroups')
        .mockResolvedValue([group]);
      const result = await service.getTodayGroups(userId);

      expect(findTodayGroups).toBeCalled();
      expect(result).toBeInstanceOf(SelectGroupsDto);
    });
  });

  // 특정 그룹 정보 조회
  describe('getGroupDetail', () => {
    it('생성되지 않은 그룹 id가 주어진다면 그룹을 찾을 수 없다는 예외를 던진다.', async () => {
      const groupId = 'groupId';

      jest.spyOn(groupRepository, 'findGroupInfo').mockResolvedValue(undefined);

      const result = async () => {
        await service.getGroupDetail(groupId);
      };

      await expect(result).rejects.toThrowError(groupException.NotFound());
    });

    it('groupId가 주어진다면 해당 그룹의 정보를 반환한다.', async () => {
      const groupId = 'groupId';
      const group: Group = {
        groupId: 'groupId',
        title: 'title',
        categoryId: 0,
        placeName: 'placeName',
        description: 'description',
        imageUrl: 'imageUrl',
        startAt: undefined,
        endAt: undefined,
        limit: 0,
        locationX: 0.0,
        locationY: 0.0,
        address: 'address',
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
        host: 'host',
        guests: [],
        comments: [],
      };

      const findGroupInfo = jest
        .spyOn(groupRepository, 'findGroupInfo')
        .mockResolvedValue(group);

      const result = await service.getGroupDetail(groupId);

      expect(findGroupInfo).toBeCalled();
      expect(result.groupId).toEqual('groupId');
    });
  });

  // 조건에 따른 그룹 목록 조회
  describe('getGroupsByQuery', () => {
    it('조건이 주어지면 조건에 따른 그룹 목록을 반환한다..', async () => {
      const x = 0;
      const y = 0;
      const group: Group = {
        groupId: 'groupId',
        title: 'title',
        categoryId: 0,
        placeName: 'placeName',
        description: 'description',
        imageUrl: 'imageUrl',
        startAt: undefined,
        endAt: undefined,
        limit: 0,
        locationX: 0.0,
        locationY: 0.0,
        address: 'address',
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
        host: 'host',
        guests: [],
        comments: [],
      };

      const findGroupsByQuery = jest
        .spyOn(groupRepository, 'findGroupsByQuery')
        .mockResolvedValue([group]);

      const result = await service.getGroupsByQuery(x, y);

      expect(findGroupsByQuery).toBeCalled();
      expect(result).toBeInstanceOf(SelectGroupsDto);
    });
  });

  // 사용자의 모든 그룹 조회
  describe('getUserGroups', () => {
    it('유저의 id가 주어진다면 해당 유저의 모든 그룹을 반환한다.', async () => {
      const userId = 'userId';
      const group: Group = {
        groupId: 'groupId',
        title: 'title',
        categoryId: 0,
        placeName: 'placeName',
        description: 'description',
        imageUrl: 'imageUrl',
        startAt: undefined,
        endAt: undefined,
        limit: 0,
        locationX: 0.0,
        locationY: 0.0,
        address: 'address',
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
        host: 'host',
        guests: [],
        comments: [],
      };

      const findGroupsByUserId = jest
        .spyOn(groupRepository, 'findGroupsByUserId')
        .mockResolvedValue([group]);

      const result = await service.getUserGroups(userId);

      expect(findGroupsByUserId).toBeCalled();
      expect(result).toBeInstanceOf(SelectGroupsDto);
    });
  });

  // 그룹 참여 및 탈퇴
  describe('joinOrExitGroup', () => {
    it('action이 join 또는 exit가 아니라면 잘못된 요청이라는 예외를 던진다.', async () => {
      const userId = 'userId';
      const groupId = 'groupId';
      const action: GroupAction = 'join';

      const result = async () => {
        await service.joinOrExitGroup(userId, groupId, action);
      };

      await expect(result).rejects.toThrowError(groupException.BadRequest());
    });

    it('그룹의 hostId와 userId가 같다면 방장은 그룹을 지켜야한다는 예외를 던진다.', async () => {
      const userId = 'userId';
      const groupId = 'groupId';
      const action: GroupAction = 'join';

      jest.spyOn(groupRepository, 'findGroupHost').mockResolvedValue(undefined);

      const result = async () => {
        await service.joinOrExitGroup(userId, groupId, action);
      };

      await expect(result).rejects.toThrowError(groupException.YouAreHost());
    });

    it('그룹에 참여한다.', async () => {
      const userId = 'userId';
      const groupId = 'groupId';
      const action: GroupAction = 'join';

      jest
        .spyOn(groupRepository, 'findGroupHost')
        .mockResolvedValue({ host: { userId: 'userId' } });
      const saveGroupUser = jest.spyOn(groupUserRepository, 'save');

      await service.joinOrExitGroup(userId, groupId, action);

      expect(saveGroupUser).toBeCalled();
    });

    it('그룹을 탈퇴한다.', async () => {
      const userId = 'userId';
      const groupId = 'groupId';
      const action: GroupAction = 'exit';

      jest
        .spyOn(groupRepository, 'findGroupHost')
        .mockResolvedValue({ host: { userId: 'userId' } });
      const softDeleteGroupUser = jest
        .spyOn(groupUserRepository, 'softDelete')
        .mockResolvedValue({} as DeleteResult);

      await service.joinOrExitGroup(userId, groupId, action);

      expect(softDeleteGroupUser).toBeCalled();
      expect(softDeleteGroupUser).toHaveBeenCalledWith({
        groupId,
        guest: userId,
      });
    });
  });
});
