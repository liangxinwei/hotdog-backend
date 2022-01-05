import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto';
import { User } from 'src/entity';
import { Response } from 'src/sdks';

import { UserService } from './user.service';

@Controller('/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '查询所有 user' })
  @Get('all')
  async findAll(): Promise<Response<User[]>> {
    const users = await this.userService.findAll();
    return {
      data: users,
      statusCode: HttpStatus.OK,
    };
  }

  @ApiOperation({ summary: '通过 account 查询某一个 user' })
  @Get('find')
  async findUserByAccount(
    @Query() query: { account: string },
  ): Promise<Response<User>> {
    if (!query.account) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'account 不能为空',
      };
    }

    const user = await this.userService.findOneByAccount(query.account);

    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }

  @ApiOperation({ summary: '通过 id 查询某一个 user' })
  @Get(':id')
  async findUserById(@Param() params: { id: number }): Promise<Response<User>> {
    if (!params.id) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'id 不能为空',
      };
    }

    const user = await this.userService.findOneById(params.id);

    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }

  @ApiOperation({ summary: '注册 user' })
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Response<User>> {
    const user = await this.userService.register(createUserDto);
    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }
}
