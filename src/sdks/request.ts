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
   * 用户不存在
   */
  USER_NOT_EXISTED = 2001,
  /**
   * 用户已存在
   */
  USER_EXISTED = 2002,
}

export type SuccessResponse<T> = {
  statusCode: HttpStatus | ResponseStatus;
  data: T;
};

export type ErrorResponse = {
  statusCode: HttpStatus | ResponseStatus;
  message: string;
};

export type Response<T> = SuccessResponse<T> | ErrorResponse;
