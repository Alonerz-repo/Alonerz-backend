import { SwaggerQuery } from '../interface';

export const UserQuery: SwaggerQuery = {
  filter: {
    in: 'query',
    name: 'filter',
    type: 'string',
    required: true,
    example: 'following',
    description: '`following`: 팔로잉 목록 / `follower`: 팔로워 목록',
  },
};
