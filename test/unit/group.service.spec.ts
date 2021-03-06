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

  // ??? ?????? ??????
  describe('createGroup', () => {
    it('??? ????????? ????????????.', async () => {
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

  // ?????? ?????? ??????
  describe('updateGroup', () => {
    it('????????? ???????????? ?????? ????????? ??????????????? ????????? ????????? ????????? ?????????', async () => {
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

    it('?????? ????????? ????????????.', async () => {
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

  // ?????? ??????
  describe('deleteGroup', () => {
    it('????????? ???????????? ?????? ????????? ??????????????? ????????? ????????? ????????? ?????????.', async () => {
      const userId = 'userId';
      const groupId = 'groupId';

      jest.spyOn(groupRepository, 'findOne').mockResolvedValue(undefined);

      await service.deleteGroup(userId, groupId);

      expect(groupException.AccessDenined).toBeCalled();
    });

    it('????????? ????????????.', async () => {
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

  // ?????? ?????? ?????? ?????? ??????
  describe('getTodayGroups', () => {
    it('????????? id??? ??????????????? ?????? id??? ?????? ?????? ?????? ????????? ????????????.', async () => {
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

  // ?????? ?????? ?????? ??????
  describe('getGroupDetail', () => {
    it('???????????? ?????? ?????? id??? ??????????????? ????????? ?????? ??? ????????? ????????? ?????????.', async () => {
      const groupId = 'groupId';

      jest.spyOn(groupRepository, 'findGroupInfo').mockResolvedValue(undefined);

      const result = async () => {
        await service.getGroupDetail(groupId);
      };

      await expect(result).rejects.toThrowError(groupException.NotFound());
    });

    it('groupId??? ??????????????? ?????? ????????? ????????? ????????????.', async () => {
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

  // ????????? ?????? ?????? ?????? ??????
  describe('getGroupsByQuery', () => {
    it('????????? ???????????? ????????? ?????? ?????? ????????? ????????????..', async () => {
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

  // ???????????? ?????? ?????? ??????
  describe('getUserGroups', () => {
    it('????????? id??? ??????????????? ?????? ????????? ?????? ????????? ????????????.', async () => {
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

  // ?????? ?????? ??? ??????
  describe('joinOrExitGroup', () => {
    it('action??? join ?????? exit??? ???????????? ????????? ??????????????? ????????? ?????????.', async () => {
      const userId = 'userId';
      const groupId = 'groupId';
      const action: GroupAction = 'join';

      const result = async () => {
        await service.joinOrExitGroup(userId, groupId, action);
      };

      await expect(result).rejects.toThrowError(groupException.BadRequest());
    });

    it('????????? hostId??? userId??? ????????? ????????? ????????? ?????????????????? ????????? ?????????.', async () => {
      const userId = 'userId';
      const groupId = 'groupId';
      const action: GroupAction = 'join';

      jest.spyOn(groupRepository, 'findGroupHost').mockResolvedValue(undefined);

      const result = async () => {
        await service.joinOrExitGroup(userId, groupId, action);
      };

      await expect(result).rejects.toThrowError(groupException.YouAreHost());
    });

    it('????????? ????????????.', async () => {
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

    it('????????? ????????????.', async () => {
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
