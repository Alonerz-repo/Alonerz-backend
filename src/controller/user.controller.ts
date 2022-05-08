import { Request, Response } from 'express';
import {
  Controller,
  Get,
  Middleware,
  Patch,
} from '../common/decorator/application';
import { UpdateUserDto } from '../common/dto/user.dto';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { findUser, updateUser } from '../service/user.service';

@Controller('/api/users')
export class UserController {
  @Get('/:id')
  // @Middleware(AuthMiddleware.validateServiceToken)
  public async getUserProfile(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const user = await findUser(userId);
      return res.status(200).send(user);
    } catch (error) {
      return res.status(error.statusCode).send(error);
    }
  }

  @Patch('/:id')
  @Middleware(AuthMiddleware.validateServiceTokens)
  public async updateUserProfile(req: Request, res: Response) {
    try {
      const userId = Number(req.params.id);
      const updateUserDto: UpdateUserDto = req.body;
      await updateUser(userId, updateUserDto);
      return res.status(200).send();
    } catch (error) {
      return res.status(error.statusCode).send(error);
    }
  }
}
