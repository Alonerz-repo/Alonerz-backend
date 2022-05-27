export class ChatRoomUserDto {
  userId: string;
  nickname: string;
  profileImageUrl: string;

  constructor(chatRoom: any) {
    const { chatuser_userId, chatuser_nickname, chatuser_profileImageUrl } =
      chatRoom;

    this.userId = chatuser_userId;
    this.nickname = chatuser_nickname;
    this.profileImageUrl = chatuser_profileImageUrl;
  }
}
