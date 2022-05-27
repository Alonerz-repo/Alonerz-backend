export class ChatUserDto {
  userId: string;
  nickname: string;
  profileImageUrl: string;

  constructor(chat: any) {
    const { userId, nickname, profileImageUrl } = chat;
    this.userId = userId;
    this.nickname = nickname;
    this.profileImageUrl = profileImageUrl;
  }
}
