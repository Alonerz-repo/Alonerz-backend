export interface Payload {
  userId: number;
  kakaoId: string;
  nickname: string;
}

export type When = 'lunch' | 'dinner';
export type Action = 'join' | 'exit';
