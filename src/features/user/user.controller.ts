import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { Response } from 'src/constants';
import { CreateUser } from 'src/dto';
import { User } from 'src/entity';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('find')
  async findUser(@Body() body: any): Promise<Response<User>> {
    const user = await this.userService.findOne(body.account);
    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }

  @Post('register')
  async register(@Body() body: CreateUser): Promise<Response<User>> {
    const user = await this.userService.register(body);
    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }
}
