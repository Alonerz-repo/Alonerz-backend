export interface Payload {
  userId: number;
  kakaoId: string;
  nickname: string;
}

export type GroupTime = 'lunch' | 'dinner';
export type GroupAction = 'join' | 'exit';
export type FollowFilter = 'following' | 'follower';

interface SwaggerParam {
  in: 'query' | 'cookie' | 'path' | 'header';
  type: string;
  name: string;
  example?: any;
  description?: string;
  required?: boolean;
}

interface SwaggerOperation {
  summary: string;
  description?: string;
}

interface SwaggerBody {
  required?: boolean;
  default?: any;
  example?: any;
}

export type SwaggerSetting = {
  tag: string;
  operations: Record<string, SwaggerOperation>;
  param?: Record<string, SwaggerParam>;
  query?: Record<string, SwaggerParam>;
};

export type SwaggerProperty = Record<string, SwaggerBody>;
