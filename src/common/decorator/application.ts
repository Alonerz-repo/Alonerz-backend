import 'reflect-metadata';
import { NextFunction, Request, Response, Router } from 'express';
import {
  MetadataKeys,
  Method,
  MiddlewareHandler,
  RouteHandlerDecriptor,
} from '../interface';

// 메타데이터 조회
const getMetadata = (
  key: string,
  target: Object,
  propertyKey: string | symbol
): any => {
  const metadataKey = MetadataKeys[key];
  return Reflect.getMetadata(metadataKey, target, propertyKey);
};

// RouteHandler 메타데이터로 router에 연결
const controllerBinder = (router: Router, prefix: string, target: Function) => {
  const prototypes = target.prototype;
  Object.keys(prototypes).forEach((propertyKey) => {
    const handler = prototypes[propertyKey];
    const path = getMetadata('path', prototypes, propertyKey);
    const method: Method = getMetadata('method', prototypes, propertyKey);

    // 나중에 경로 체크 필요
    // /api//test 이런 식으로 매핑되는 경우도 있음
    router[method](`${prefix}${path}`, handler);
  });
};

// Controller 데코레이터
export const Controller = (prefix: string = '/') => {
  return function (target: Function) {
    const router = Router();
    controllerBinder(router, prefix, target);
    target.prototype.router = router;
  };
};

// RouteHandler 메타데이터 정의
const routerBinder = (method: Method) => {
  return function (path: string = '') {
    return function (target: any, key: string, _: RouteHandlerDecriptor) {
      Reflect.defineMetadata(MetadataKeys.method, method, target, key);
      Reflect.defineMetadata(MetadataKeys.path, path, target, key);
    };
  };
};

// Router 데코레이터
export const Get = routerBinder(Method.get);
export const Post = routerBinder(Method.post);
export const Put = routerBinder(Method.put);
export const Patch = routerBinder(Method.patch);
export const Delete = routerBinder(Method.delete);

// Middleware 데코레이터
export function Middleware(handler: MiddlewareHandler) {
  return function (_: any, __: string, desc: RouteHandlerDecriptor) {
    const route = desc.value;
    desc.value = function (req: Request, res: Response, next: NextFunction) {
      handler(req, res, () => route(req, res, next));
    };
  };
}
