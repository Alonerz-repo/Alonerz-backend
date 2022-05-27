import { Test } from '@nestjs/testing';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { StickerRepository } from 'src/sticker/sticker.repository';
import { StickerService } from 'src/sticker/sticker.service';
import { StickerException } from 'src/sticker/sticker.exception';
import { Sticker } from 'src/sticker/sticker.entity';
import { CreateStickerDto } from 'src/sticker/dto/request/create-sticker.dto';
import { CreatedStickerDto } from 'src/sticker/dto/response/created-sticker.dto';

const mockStickerRepository = {
  findOne: jest.fn(),
  update: jest.fn(),
  save: jest.fn(),
  getStickers: jest.fn(),
  createSticker: jest.fn(),
  updateSticker: jest.fn(),
  deleteSticker: jest.fn(),
};

const mockStickerException = {
  NotFound: jest.fn(),
};

type MockStickerRepository = Partial<
  Record<keyof StickerRepository, jest.Mock>
>;

describe('StickerService', () => {
  let service: StickerService;
  let stickerRepository: MockStickerRepository;
  let stickerException;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        StickerService,
        {
          provide: StickerRepository,
          useValue: mockStickerRepository,
        },
        {
          provide: StickerException,
          useValue: mockStickerException,
        },
      ],
    }).compile();

    service = module.get<StickerService>(StickerService);
    stickerRepository = module.get(StickerRepository);
    stickerException = module.get(StickerException);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 사용자의 모든 스티커 조회
  describe('getStickers', () => {
    it('유저의 id가 주어진다면 해당 유저의 모든 스티커 목록을 반환한다.', async () => {
      const userId = 'userId';
      const sticker: Sticker = {
        stickerId: 1,
        stickerImageId: 1,
        stickerOrder: 1,
        userId: 'userId',
      };
      const stickerRepositoryFindOneSpy = jest
        .spyOn(stickerRepository, 'getStickers')
        .mockResolvedValue([sticker]);

      const result = await service.getStickers(userId);

      expect(stickerRepositoryFindOneSpy).toBeCalled();
      expect(result.stickers[0].stickerId).toEqual(sticker.stickerId);
    });
  });

  // 스티커 저장(v2)
  describe('putSticker', () => {
    it('스티커를 저장한다.', async () => {
      const userId = 'userId';
      const createStickerDto: CreateStickerDto = {
        stickerId: 1,
        stickerImageId: 1,
        stickerOrder: 1,
      };

      const stickerRepositoryFindOneSpy = jest
        .spyOn(stickerRepository, 'findOne')
        .mockResolvedValue(undefined);
      const stickerRepositorySaveSpy = jest
        .spyOn(stickerRepository, 'save')
        .mockResolvedValue({} as InsertResult);

      const result = await service.putSticker(userId, createStickerDto);

      expect(stickerRepositoryFindOneSpy).toBeCalled();
      expect(stickerRepositorySaveSpy).toHaveBeenCalledWith({
        userId,
        ...createStickerDto,
      });
      expect(result).toBeInstanceOf(CreatedStickerDto);
    });

    it('스티커를 수정한다.', async () => {
      const userId = 'userId';
      const createStickerDto: CreateStickerDto = {
        stickerId: 1,
        stickerImageId: 1,
        stickerOrder: 1,
      };
      const sticker: Sticker = {
        stickerId: 1,
        stickerImageId: 1,
        stickerOrder: 1,
        userId: 'userId',
      };
      const stickerRepositoryFindOneSpy = jest
        .spyOn(stickerRepository, 'findOne')
        .mockResolvedValue(sticker);
      const stickerRepositoryUpdateSpy = jest
        .spyOn(stickerRepository, 'update')
        .mockResolvedValue({} as UpdateResult);

      const result = await service.putSticker(userId, createStickerDto);

      expect(stickerRepositoryFindOneSpy).toBeCalled();
      expect(stickerRepositoryUpdateSpy).toHaveBeenCalledWith(
        {
          stickerId: 1,
          stickerOrder: 1,
        },
        {
          stickerImageId: 1,
        },
      );
      expect(result).toBeInstanceOf(CreatedStickerDto);
    });
  });

  // 스티커 제거
  describe('deleteSticker', () => {
    it('존재하지 않는 스티커 id가 주어진다면 스티커를 찾을 수 없다는 예외를 던진다', async () => {
      const stickerId = 1;

      jest.spyOn(stickerRepository, 'findOne').mockResolvedValue(undefined);

      await service.deleteSticker(stickerId);

      expect(stickerException.NotFound).toBeCalled();
    });

    it('스티커를 제거한다', async () => {
      const stickerId = 1;

      const stickerRepositoryFindOneSpy = jest
        .spyOn(stickerRepository, 'findOne')
        .mockResolvedValue(Sticker);
      const stickerRepositoryDeleteSpy = jest
        .spyOn(stickerRepository, 'deleteSticker')
        .mockResolvedValue({} as DeleteResult);

      await service.deleteSticker(stickerId);

      expect(stickerRepositoryFindOneSpy).toBeCalled();
      expect(stickerRepositoryDeleteSpy).toHaveBeenCalledWith(stickerId);
    });
  });
});
