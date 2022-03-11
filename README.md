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

> 此项目主要用于学习使用 TypeScript 开发 Node.js 项目，不用于任何商业用途。

### 开发环境
- macOS 10.15.4
- Node.js v14.15.3
- MySQL 8.0.12

### 部署环境
- 阿里云 CentOS 7.2 64位
- Node.js v14.15.3
- MySQL 8.0.12

## 搭建开发环境
1. [安装 Docker](https://www.runoob.com/docker/macos-docker-install.html)
2. [安装 Docker Compose](https://www.runoob.com/docker/docker-compose.html)


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
todo swagger ui
