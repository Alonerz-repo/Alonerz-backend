import { NextFunction, Request, RequestHandler, Response } from 'express';

// 메타데이터 키 종류
export enum MetadataKeys {
  path = 'path',
  method = 'method',
}

// 메소드 종류
export enum Method {
  get = 'get',
  post = 'post',
  patch = 'patch',
  put = 'put',
  delete = 'delete',
}

// RouteHandler 객체
export interface RouteHandlerDecriptor extends PropertyDescriptor {
  handler?: RequestHandler;
}

// MiddlewareHandler 함수
export interface MiddlewareHandler {
  (req: Request, res: Response, next?: NextFunction): any;
}
