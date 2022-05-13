import { SwaggerOperation } from '../interface';

export const GroupTag = '그룹 API';
export const GroupOperation: SwaggerOperation = {
  getTodayGroups: {
    summary: '나의 오늘 참여 그룹 목록 조회 API',
    description: '사용자의 당일 참여하기로 예정된 그룹을 조회합니다.',
  },
  getGroupsByQuery: {
    summary: '조건부 참여 가능 그룹 목록 조회 API',
    description: '조건에 따른 참여 가능 그룹 목록을 조회합니다.',
  },
  getUserGroups: {
    summary: '사용자의 그룹 참여 이력 목록 조회 API',
    description: '사용자의 모든 참여 그룹 목록을 조회합니다.',
  },
  findGroup: {
    summary: '그룹 상세 정보 조회 API',
    description: '그룹의 상세 내용을 조회합니다.',
  },
  createGroup: {
    summary: '새 그룹 생성 API',
    description: '새로운 그룹을 생성합니다.',
  },
  updateGroup: {
    summary: '그룹 정보 수정 API',
    description: '그룹의 상세 내용 정보를 수정합니다.',
  },
  deleteGroup: {
    summary: '그룹 삭제 API',
    description: '그룹을 삭제합니다.',
  },
  joinOrExitGroup: {
    summary: '그룹 참여 및 탈퇴 API',
    description: '그룹의 모든 댓글을 조회합니다.',
  },
  getGroupComments: {
    summary: '그룹 댓글 조회 API',
    description: '그룹의 모든 댓글을 조회합니다.',
  },
  createGroupComment: {
    summary: '그룹 댓글 등록 API',
    description: '그룹 댓글을 등록합니다.',
  },
  getChildComments: {
    summary: '하위 댓글 조회 API',
    description: '특정 댓글의 하위 댓글을 조회합니다.',
  },
  createChildComment: {
    summary: '하위 댓글 등록 API',
    description: '특정 댓글의 하위 댓글을 등록합니다.',
  },
  updateComment: {
    summary: '댓글 수정 API',
    description: '댓글을 수정합니다.',
  },
  deleteComment: {
    summary: '댓글 삭제 API',
    description: '댓글을 삭제합니다.',
  },
};
