import { SwaggerParam } from '../interface';

export const UserParam: SwaggerParam = {
  userId: {
    in: 'path',
    name: 'userId',
    type: 'int',
    required: false,
    example: '1',
  },
  otherId: {
    in: 'path',
    name: 'otherId',
    type: 'int',
    required: false,
    example: '1',
  },
};
