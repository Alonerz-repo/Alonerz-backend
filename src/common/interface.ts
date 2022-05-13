export interface Payload {
  userId: number;
  kakaoId: string;
  nickname: string;
}

export type GroupTime = 'lunch' | 'dinner';
export type GroupAction = 'join' | 'exit';
export type FollowType = 'following' | 'follower';
