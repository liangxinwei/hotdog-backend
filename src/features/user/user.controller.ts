import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto';
import { User } from 'src/entity';
import { Response } from 'src/sdks';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '查询某一个 user' })
  @Post('find')
  async findUser(
    @Body() body: Pick<CreateUserDto, 'account'>,
  ): Promise<Response<User>> {
    const user = await this.userService.findOne(body.account);
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
