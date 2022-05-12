import { SwaggerOperation } from '../interface';

export const GroupTag = '그룹 API';
export const GroupOperation: SwaggerOperation = {
  getTodayGroups: {
    summary: '나의 오늘 참여 그룹 목록 조회 API',
  },
  getGroupsByQuery: {
    summary: '조건부 그룹 목록 조회 API',
  },
  getUserGroups: {
    summary: '사용자의 모든 참여 그룹 목록 조회 API',
  },
  findGroup: {
    summary: '그룹 상세 정보 조회 API',
  },
  createGroup: {
    summary: '새 그룹 생성 API',
  },
  updateGroup: {
    summary: '그룹 정보 수정 API',
  },
  deleteGroup: {
    summary: '그룹 삭제 API',
  },
  joinOrExitGroup: {
    summary: '그룹 참여 및 탈퇴 API',
  },
};
