import { HttpStatus } from '@nestjs/common';

export const REQUEST_ID_TOKEN_HEADER = 'x-request-id';

export const FORWARDED_FOR_TOKEN_HEADER = 'x-forwarded-for';

export const VALIDATION_PIPE_OPTIONS = { transform: true, whitelist: true };

/**
 * 自定义返回值 code
 */
export enum ResponseStatus {
  /**
   * 密码错误
   */
  PASSWORD_ERROR = 2000,
  /**
   * adminUser 用户找不到
   */
  NO_ADMIN_USER = 2001,
  /**
   * adminUser 用户已存在
   */
  ADMIN_USER_EXISTED = 2001,
}

export type Response<T> = {
  data?: T;
  code: HttpStatus | ResponseStatus;
  msg?: string;
};
