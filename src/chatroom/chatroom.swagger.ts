export const ChatRoomSwagger = {
  tag: '채팅방 API',
  routes: {
    getChatRooms: {
      summary: '채팅방 목록 조회 API',
      description: '자신의 채팅방 목록을 조회합니다.',
    },
    createChatRoom: {
      summary: '1:1 채팅방 생성 API',
      description:
        '상대방에게 DM 신청 시 1:1 체팅방을 생성합니다. 이미 생성된 채팅방이 있는 경우 기존의 채팅방의 roomId를 반환합니다.',
    },
  },
  response: {
    getChatRooms: {
      200: {
        status: 200,
        description: '성공',
        // type
      },
      401: {
        status: 401,
        description: '로그인 필요',
        // type
      },
    },
    createChatRoom: {
      201: {
        status: 201,
        description: '성공',
        // type
      },
      401: {
        status: 401,
        description: '로그인 필요',
        // type
      },
    },
  },
};
