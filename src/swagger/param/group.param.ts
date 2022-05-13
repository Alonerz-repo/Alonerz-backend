import { SwaggerParam } from '../interface';

export const GroupParam: SwaggerParam = {
  userId: {
    in: 'path',
    name: 'userId',
    type: 'int',
    required: false,
    example: '1',
  },
  groupId: {
    in: 'path',
    name: 'groupId',
    type: 'int',
    required: false,
    example: '1',
  },
  commentId: {
    in: 'path',
    name: 'commentId',
    type: 'int',
    required: false,
    example: '1',
  },
  parentId: {
    in: 'path',
    name: 'parentId',
    type: 'int',
    required: false,
    example: '1',
  },
};
