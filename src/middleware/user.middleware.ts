import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../repository/user.repository';

export const isExistNickname = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nickname } = req.body;
  if (!nickname) return next();
  const exist = await UserRepository.findOneBy({ nickname });
  if (exist) {
    return res.status(409).json({
      error: '이미 존재하는 닉네임입니다.',
    });
  }
  return next();
};
