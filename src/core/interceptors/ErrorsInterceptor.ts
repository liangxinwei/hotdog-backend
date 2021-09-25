import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error): any => {
        if (error instanceof HttpException) {
          return Promise.resolve({
            statusCode: error.getStatus(),
            message: error.getResponse(),
          });
        }

        return Promise.resolve({
          statusCode: 500,
          message: `出现了意外错误：${error.toString()}`,
        });
      }),
    );
  }
}
