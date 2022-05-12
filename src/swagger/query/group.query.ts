import { SwaggerQuery } from '../interface';

export const GroupQuery: SwaggerQuery = {
  x: {
    in: 'query',
    name: 'x',
    type: 'number',
    example: '36.358361084097034',
  },
  y: {
    in: 'query',
    name: 'y',
    type: 'number',
    example: '127.34540366949406',
  },
  when: {
    in: 'query',
    name: 'when',
    type: 'string',
    required: false,
    example: 'lanch',
  },
  action: {
    in: 'query',
    name: 'action',
    type: 'join | exit',
    required: false,
    example: 'join',
  },
  offset: {
    in: 'query',
    name: 'offset',
    type: 'int',
    required: false,
    example: undefined,
  },
};
