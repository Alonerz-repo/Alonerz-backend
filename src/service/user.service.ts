import {
  UserBlockRepository,
  UserCareerRepository,
  UserFollowRepository,
  UserPointRepository,
  UserRepository,
} from '../repository/user.repository';

export class UserService {
  private readonly userRepository = UserRepository;
  private readonly userCareerRepository = UserCareerRepository;
  private readonly userPointRepository = UserPointRepository;
  private readonly UserFollowRepository = UserFollowRepository;
  private readonly UserBlockRepository = UserBlockRepository;
}
