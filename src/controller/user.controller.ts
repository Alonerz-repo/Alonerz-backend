import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/user.entity';
import { AppDataSource } from '../data-source';

export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async me(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    // return this.userRepository.findOneBy({ id: 1 });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    // let userToRemove = await this.userRepository.findOneBy({ id: 1 });
    // await this.userRepository.remove(userToRemove);
  }
}
