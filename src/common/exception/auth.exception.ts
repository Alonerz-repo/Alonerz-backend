import { Response } from 'express';

export class AuthException {
  public static badRequest(res: Response) {
    const statusCode = 400;
    return res.status(statusCode).json({
      statusCode,
      error: 'bad request',
      message: '잘못된 요청입니다.',
    });
  }

  public static expiredToken(res: Response) {
    const statusCode = 403;
    return res.status(statusCode).json({
      statusCode,
      error: 'forbidden',
      message: '토큰이 만료되었습니다.',
    });
  }

  public static unauthorized(res: Response) {
    const statusCode = 401;
    return res.status(statusCode).json({
      statusCode,
      error: 'unauthorized',
      message: '인증에 실패하였습니다.',
    });
  }

  public static invalidToken(res: Response) {
    const statusCode = 400;
    return res.status(statusCode).json({
      statusCode,
      error: 'bad request',
      message: '유효하지 않은 토큰입니다.',
    });
  }

  public static unknownError(res: Response) {
    const statusCode = 520;
    return res.status(statusCode).json({
      statusCode,
      error: 'unknown',
      message: '알 수 없는 오류가 발생하였습니다.',
    });
  }

  public static notfound(res: Response) {
    const statusCode = 404;
    return res.status(statusCode).json({
      statusCode,
      error: 'notfound',
      message: '로그인이 필요합니다.',
    });
  }
}
