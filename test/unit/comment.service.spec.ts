import { Test } from '@nestjs/testing';
import { Connection, DeleteResult, UpdateResult } from 'typeorm';
import { CommentService } from 'src/comment/comment.service';
import { CommentRepository } from 'src/comment/comment.repository';
import { CommentException } from 'src/comment/comment.exception';
import { Comment } from 'src/comment/comment.entity';
import { CreateCommentDto } from 'src/comment/dto/request/create-comment.dto';
import { UpdateCommentDto } from 'src/comment/dto/request/update-comment.dto';

const mockCommentRepository = {
  findOne: jest.fn(),
  findCommentByGroupId: jest.fn(),
  createGroupComment: jest.fn(),
  findChildComments: jest.fn(),
  createChildCommentTransaction: jest.fn(),
  increaseChildCommentCountTransaction: jest.fn(),
  deleteChildCommentTransaction: jest.fn(),
  decreaseChildCommentCountTransaction: jest.fn(),
  updateComment: jest.fn(),
  deleteComment: jest.fn(),
};

const mockCommentException = {
  NotFound: jest.fn(),
  AccessDenined: jest.fn(),
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
      save: (r: Response) => r,
      update: (r: Response) => r,
      delete: (r: Response) => r,
    },
  }),
};

type MockCommentRepository = Partial<
  Record<keyof CommentRepository, jest.Mock>
>;

describe('CommentService', () => {
  let service: CommentService;
  let commentRepository: MockCommentRepository;
  let commentException;
  let connection;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: CommentRepository,
          useValue: mockCommentRepository,
        },
        {
          provide: CommentException,
          useValue: mockCommentException,
        },
        {
          provide: Connection,
          useValue: mockConnection,
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
    commentRepository = module.get(CommentRepository);
    commentException = module.get(CommentException);
    connection = module.get<Connection>(Connection);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const groupId = 'groupId';
  const userId = 'userId';
  const comment: Comment = {
    commentId: 1,
    groupId: 'groupId',
    parentId: 0,
    childCommentCount: 1,
    userId: 'userId',
    content: 'content',
    createdAt: undefined,
    updatedAt: undefined,
    deletedAt: undefined,
  };

  // ?????? ?????? ??????
  describe('getGroupComments', () => {
    it('?????? id??? ??????????????? ?????? ????????? ????????? ????????????.', async () => {
      const offset = 5;
      const commentRepositoryFindCommentSpy = jest
        .spyOn(commentRepository, 'findCommentByGroupId')
        .mockResolvedValue([comment]);

      const result = await service.getGroupComments(groupId, offset);

      expect(commentRepositoryFindCommentSpy).toBeCalled();
      expect(result.comments[0].commentId).toStrictEqual(1);
    });
  });

  // ?????? ?????? ??????
  describe('createGroupComment', () => {
    it('?????? ?????? ??? ????????? ????????? ????????????.', async () => {
      const createCommentDto: CreateCommentDto = {
        content: 'content',
      };
      jest
        .spyOn(commentRepository, 'createGroupComment')
        .mockResolvedValue(comment);

      const result = await service.createGroupComment(
        groupId,
        userId,
        createCommentDto,
      );

      expect(result.content).toEqual('content');
    });
  });

  // ?????? ?????? ??????
  describe('getChildComments', () => {
    it('???????????? ?????? ???????????? id??? ??????????????? ????????? ?????? ??? ????????? ????????? ?????????.', async () => {
      const parentId = 99;
      const offset = 5;
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(false);

      const result = async () => {
        await service.getChildComments(groupId, parentId, offset);
      };

      await expect(result).rejects.toThrowError(commentException.NotFound());
    });

    it('?????? id??? parentId??? ??????????????? ????????? ?????? ????????? ????????????.', async () => {
      const parentId = 1;
      const offset = 5;
      const commentRepositoryFindOneSpy = jest
        .spyOn(commentRepository, 'findOne')
        .mockResolvedValue(comment);
      const commentRepositoryFindChildSpy = jest
        .spyOn(commentRepository, 'findChildComments')
        .mockResolvedValue([comment]);

      const result = await service.getChildComments(groupId, parentId, offset);

      expect(commentRepositoryFindOneSpy).toBeCalled();
      expect(commentRepositoryFindChildSpy).toBeCalled();
      expect(result.comments[0].commentId).toEqual(1);
    });
  });

  // ?????? ?????? ??????
  describe('createChildComment', () => {
    it('???????????? ?????? ?????? id??? ??????????????? ????????? ?????? ??? ????????? ????????? ?????????.', async () => {
      const parentId = 99;
      const createCommentDto: CreateCommentDto = {
        content: 'content',
      };
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(false);

      const result = async () => {
        await service.createChildComment(
          groupId,
          parentId,
          userId,
          createCommentDto,
        );
      };

      await expect(result).rejects.toThrowError(commentException.NotFound());
    });

    it('????????? ?????? ?????? ?????? ??? ????????? ????????? ????????????.', async () => {
      const parentId = 1;
      const createCommentDto: CreateCommentDto = {
        content: 'content',
      };

      const commentRepositoryFindOneSpy = jest
        .spyOn(commentRepository, 'findOne')
        .mockResolvedValue(comment);
      const createChildCommentTransaction = jest
        .spyOn(commentRepository, 'createChildCommentTransaction')
        .mockResolvedValue(comment);
      const increaseChildCommentCountTransaction = jest
        .spyOn(commentRepository, 'increaseChildCommentCountTransaction')
        .mockResolvedValue(undefined);

      const result = await service.createChildComment(
        groupId,
        parentId,
        userId,
        createCommentDto,
      );

      expect(commentRepositoryFindOneSpy).toBeCalled();
      expect(createChildCommentTransaction).toBeCalled();
      expect(increaseChildCommentCountTransaction).toBeCalled();
      expect(result.content).toEqual('content');
    });
  });

  // ?????? ??????
  describe('updateComment', () => {
    it('????????? ???????????? ?????? ????????? ??????????????? ????????? ????????? ????????? ?????????.', async () => {
      const commentId = 1;
      const updateCommentDto: UpdateCommentDto = {
        content: 'update content',
      };
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(false);

      await service.updateComment(userId, commentId, updateCommentDto);

      expect(commentException.AccessDenined).toBeCalled();
    });

    it('?????? ????????? ????????????.', async () => {
      const commentId = 1;
      const updateCommentDto: UpdateCommentDto = {
        content: 'update content',
      };
      const commentRepositoryFindOneSpy = jest
        .spyOn(commentRepository, 'findOne')
        .mockResolvedValue(comment);
      const commentRepositoryUpdateSpy = jest
        .spyOn(commentRepository, 'updateComment')
        .mockResolvedValue({} as UpdateResult);

      await service.updateComment(userId, commentId, updateCommentDto);

      expect(commentRepositoryFindOneSpy).toBeCalled();
      expect(commentRepositoryUpdateSpy).toHaveBeenCalledWith(
        commentId,
        updateCommentDto,
      );
    });
  });

  // ?????? ??????
  describe('deleteComment', () => {
    it('????????? ???????????? ?????? ????????? ??????????????? ????????? ????????? ????????? ?????????.', async () => {
      const commentId = 1;
      jest.spyOn(commentRepository, 'findOne').mockResolvedValue(false);

      await service.deleteComment(userId, commentId);

      expect(commentException.AccessDenined).toBeCalled();
    });

    it('????????? ????????????.', async () => {
      const commentId = 1;
      const commentRepositoryFindOneSpy = jest
        .spyOn(commentRepository, 'findOne')
        .mockResolvedValue(comment);
      const commentRepositoryDeleteSpy = jest
        .spyOn(commentRepository, 'deleteComment')
        .mockResolvedValue({} as DeleteResult);

      await service.deleteComment(userId, commentId);

      expect(commentRepositoryFindOneSpy).toBeCalled();
      expect(commentRepositoryDeleteSpy).toHaveBeenCalledWith(commentId);
    });
  });
});
