import { SwaggerProperty } from '../interface';

export const GroupProperty: SwaggerProperty = {
  title: {
    example: '퇴근 후 육회드시러 가실 백엔드 개발자 모집합니다.',
  },
  menu: {
    example: '육회',
  },
  description: {
    example: 'DM으로 연락처 공유드리겠습니다.',
  },
  placeName: {
    example: '육사구이 봉명점',
  },
  startAt: {
    example: new Date(),
  },
  endAt: {
    example: new Date(),
  },
  limit: {
    example: 3,
  },
  imageUrl: {
    required: false,
    default: undefined,
    example:
      'https://github.com/choewy/react-place-app/blob/master/src/images/0.png?raw=true',
  },
  locationX: {
    example: 36.358361084097034,
  },
  locationY: {
    example: 127.34540366949406,
  },
  address: {
    example: '대전광역시 유성구 봉명동 629-2',
  },
};
