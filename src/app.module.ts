import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { ErrorsInterceptor } from 'src/core';
import { AuthModule, UserModule } from 'src/features';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UserModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
