import { Request, Response } from 'express';
import { Controller, Patch } from '../common/decorator/application';
import { UserRepository } from '../repository/user.repository';

@Controller('api/users')
export class UserController {
  private readonly userRepository = UserRepository;

  @Patch(':id')
  public async editMyProfile(req: Request, res: Response) {
    console.log(req.params);
    return res.send(req.params);
  }
}
