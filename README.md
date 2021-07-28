# hotdog 后台项目
基于 [NestJS](https://github.com/nestjs/nest) + MySQL + [TypeORM](https://github.com/typeorm/typeorm) 的 Node.js 服务端项目。

核心功能:
1. JWT认证
2. RBAC授权
3. TypeORM
4. winston日志
5. Docker就绪
6.自动生成的Swagger

## 说明
> 开发环境 macOS 10.15.4 Node.js v14.15.3 MySQL 8.0.12
    
> 部署环境 腾讯云 CentOS 7.2 64位

> 此项目主要用于学习使用 TypeScript 开发 Node.js 项目，不用于任何商业用途。

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API接口文档
[hotdog-backend 接口文档](https://github.com/liangxinwei/hotdog-backend/blob/master/API.md)
